import About from '@/components/about/About'
import '@/config/env'
import { i18n } from '@/config/locales'
import loadConfig from '@/util/loadConfig'
import { initialize } from '@electron/remote/main'
import detect from 'detect-port'
import {
  app,
  BrowserWindow,
  dialog,
  IncomingMessage,
  ipcMain,
  Menu,
  nativeImage,
  net,
  shell,
} from 'electron'
import http from 'http'
import kill from 'kill-port'
import path from 'path'
import { PythonShell } from 'python-shell'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import url from 'url'
import packageJson from '../../package.json'

const AppIcon = require('@/assets/img/climate_wallet-green.png')

const NET = 'mainnet'

app.disableHardwareAcceleration()

initialize()

const appIcon = nativeImage.createFromPath(path.join(__dirname, AppIcon))
let isSimulator = process.env.LOCAL_TEST === 'true'
const isDev = process.env.NODE_ENV === 'development'

function renderAbout(): string {
  const sheet = new ServerStyleSheet()
  const about = ReactDOMServer.renderToStaticMarkup(
    <StyleSheetManager sheet={sheet.instance}>
      <About
        packageJson={packageJson}
        versions={{ ...process.versions }}
        version={app.getVersion()}
      />
    </StyleSheetManager>
  )

  const tags = sheet.getStyleTags()
  const result = about.replace('{{CSS}}', tags) // .replaceAll('/*!sc*/', ' ');

  sheet.seal()

  return result
}

const openedWindows = new Set<BrowserWindow>()

function openAbout() {
  const about = renderAbout()

  const aboutWindow = new BrowserWindow({
    width: 400,
    height: 460,
    useContentSize: true,
    titleBarStyle: 'hiddenInset',
  })
  aboutWindow.loadURL(`data:text/html;charset=utf-8,${about}`)

  aboutWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  aboutWindow.once('closed', () => {
    openedWindows.delete(aboutWindow)
  })

  aboutWindow.setMenu(null)

  openedWindows.add(aboutWindow)

  // aboutWindow.webContents.openDevTools({ mode: 'detach' });
}

let mainWindow: any = null
let pyProc: any = null

const onRunDevService = () => {
  const script = path.join(__dirname, 'py', '../../../python/main.py')

  return PythonShell.run(script, {}, function (err, results) {
    if (err) {
      console.log('err: ', err)
    }
    console.log('response: ', results)
  })
}

const onRunService = () => {
  let productionRunApp = 'main'
  if (process.platform === 'win32') {
    productionRunApp = 'main.exe'
  }

  const script = path.join(__dirname, `../${productionRunApp}`)
  return require('child_process').execFile(script)
}

// @ts-ignore
const createMenu = () => Menu.buildFromTemplate(getMenuTemplate())

const createWindow = async () => {
  ipcMain.handle('getConfig', () => loadConfig(NET))

  ipcMain.handle('getTempDir', () => app.getPath('temp'))

  ipcMain.handle('getVersion', () => app.getVersion())

  ipcMain.handle(
    'fetchTextResponse',
    async (_event, requestOptions, requestHeaders, requestData) => {
      const request = net.request(requestOptions as any)

      Object.entries(requestHeaders || {}).forEach(([header, value]) => {
        request.setHeader(header, value as any)
      })

      let err: any | undefined = undefined
      let statusCode: number | undefined = undefined
      let statusMessage: string | undefined = undefined
      let responseBody: string | undefined = undefined

      try {
        responseBody = await new Promise((resolve, reject) => {
          request.on('response', (response: IncomingMessage) => {
            statusCode = response.statusCode
            statusMessage = response.statusMessage

            response.on('data', (chunk) => {
              const body = chunk.toString('utf8')

              resolve(body)
            })

            response.on('error', (e: string) => {
              reject(new Error(e))
            })
          })

          request.on('error', (error: any) => {
            reject(error)
          })

          request.write(requestData)
          request.end()
        })
      } catch (e) {
        console.error(e)
        err = e
      }

      return { err, statusCode, statusMessage, responseBody }
    }
  )

  ipcMain.handle(
    'fetchBinaryContent',
    async (
      _event,
      requestOptions = {},
      requestHeaders = {},
      requestData?: any
    ) => {
      const { maxSize = Infinity, ...rest } = requestOptions
      const request = net.request(rest)

      Object.entries(requestHeaders).forEach(
        ([header, value]: [string, any]) => {
          request.setHeader(header, value)
        }
      )

      let error: Error | undefined
      let statusCode: number | undefined
      let statusMessage: string | undefined
      let contentType: string | undefined
      let encoding = 'binary'
      let data: string | undefined

      const buffers: Buffer[] = []
      let totalLength = 0

      try {
        data = await new Promise((resolve, reject) => {
          request.on('response', (response: IncomingMessage) => {
            statusCode = response.statusCode
            statusMessage = response.statusMessage

            const rawContentType = response.headers['content-type']
            if (rawContentType) {
              if (Array.isArray(rawContentType)) {
                contentType = rawContentType[0]
              } else {
                contentType = rawContentType
              }

              if (contentType) {
                // extract charset from contentType
                const charsetMatch = contentType.match(/charset=([^;]+)/)
                if (charsetMatch) {
                  encoding = charsetMatch[1]
                }
              }
            }

            response.on('data', (chunk) => {
              buffers.push(chunk)

              totalLength += chunk.byteLength

              if (totalLength > maxSize) {
                reject(new Error('Response too large'))
                request.abort()
              }
            })

            response.on('end', () => {
              resolve(
                Buffer.concat(buffers).toString(encoding as BufferEncoding)
              )
            })

            response.on('error', (e: string) => {
              reject(new Error(e))
            })
          })

          request.on('error', (error: any) => {
            reject(error)
          })

          if (requestData) {
            request.write(requestData)
          }

          request.end()
        })
      } catch (e: any) {
        error = e
      }

      return { error, statusCode, statusMessage, encoding, data }
    }
  )

  ipcMain.handle('showMessageBox', async (_event, options) => {
    return await dialog.showMessageBox(mainWindow, options)
  })

  ipcMain.handle('showOpenDialog', async (_event, options) => {
    return await dialog.showOpenDialog(options)
  })

  ipcMain.handle('showSaveDialog', async (_event, options) => {
    return await dialog.showSaveDialog(options)
  })

  ipcMain.handle('download', async (_event, options) => {
    return await mainWindow.webContents.downloadURL(options.url)
  })

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 1200,
    minHeight: 900,
    backgroundColor: '#ffffff',
    show: false,
    webPreferences: {
      preload: `${__dirname}/preload.js`,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.platform === 'linux') {
    mainWindow.setIcon(appIcon)
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('close', (e) => {
    mainWindow = null
  })

  const startUrl = isDev
    ? 'http://localhost:3000'
    : url.format({
        pathname: path.join(__dirname, '/../renderer/index.html'),
        protocol: 'file:',
        slashes: true,
      })

  mainWindow.loadURL(startUrl)
  require('@electron/remote/main').enable(mainWindow.webContents)
}

const startUp = function () {
  pyProc = onRunService()

  createWindow()
}

const killTokenPort = (port) => {
  detect(port)
    .then((_port) => {
      if (port === _port) {
        console.log(`port: ${port} was not occupied`)
        startUp()
      } else {
        console.log(`port: ${port} was occupied, restart it`)
        kill(port, 'tcp')
          .then(() => {
            startUp()
          })
          .catch(console.log)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

//app start here
app.on('ready', () => {
  killTokenPort(31312)

  app.applicationMenu = createMenu()
})

const exitPyProc = () => {
  pyProc.kill()
  console.log('child process exit')
  pyProc = null
}

app.on('will-quit', (e) => {
  pyProc.kill()
})
//app quit+
app.on('window-all-closed', () => {
  pyProc.kill()
  app.quit()
})

ipcMain.on('load-page', (_, arg: { file: string; query: string }) => {
  mainWindow.loadURL(
    require('url').format({
      pathname: path.join(__dirname, arg.file),
      protocol: 'file:',
      slashes: true,
    }) + arg.query
  )
})

ipcMain.handle('setLocale', (_event, locale: string) => {
  i18n.activate(locale)
  app.applicationMenu = createMenu()
})

const getMenuTemplate = () => {
  let template = [
    {
      label: i18n._(/* i18n */ { id: 'Climate' }),
      submenu: [
        {
          label: i18n._(/* i18n */ { id: 'About Climate Wallet' }),
          click: () => {
            openAbout()
          },
        },
        {
          type: 'separator',
        },
        {
          role: 'services',
        },
        {
          type: 'separator',
        },
        {
          role: 'hide',
        },
        {
          role: 'hideothers',
        },
        {
          role: 'unhide',
        },
        {
          type: 'separator',
        },
        {
          role: 'quit',
        },
      ],
    },

    {
      label: i18n._(/* i18n */ { id: 'Edit' }),
      submenu: [
        {
          role: 'undo',
        },
        {
          role: 'redo',
        },
        {
          type: 'separator',
        },
        {
          role: 'cut',
        },
        {
          role: 'copy',
        },
        {
          role: 'paste',
        },
        {
          role: 'delete',
        },
        {
          type: 'separator',
        },
        {
          role: 'selectall',
        },
      ],
    },
    {
      label: i18n._(/* i18n */ { id: 'View' }),
      submenu: [
        {
          role: 'reload',
        },
        {
          role: 'forcereload',
        },
        {
          label: i18n._(/* i18n */ { id: 'Developer' }),
          submenu: [
            {
              label: i18n._(/* i18n */ { id: 'Developer Tools' }),
              accelerator:
                process.platform === 'darwin'
                  ? 'Alt+Command+I'
                  : 'Ctrl+Shift+I',
              click: () => mainWindow.toggleDevTools(),
            },
          ],
        },
        {
          type: 'separator',
        },
        {
          role: 'resetzoom',
        },
        {
          role: 'zoomin',
        },
        {
          role: 'zoomout',
        },
        {
          type: 'separator',
        },
        {
          label: i18n._(/* i18n */ { id: 'Full Screen' }),
          accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
          click: () => mainWindow.setFullScreen(!mainWindow.isFullScreen()),
        },
      ],
    },
    {
      label: i18n._(/* i18n */ { id: 'Window' }),
      submenu: [
        {
          role: 'minimize',
        },
        {
          role: 'zoom',
        },
        {
          role: 'close',
        },
      ],
    },
    {
      label: i18n._(/* i18n */ { id: 'Help' }),
      submenu: [
        {
          label: i18n._(/* i18n */ { id: 'About Climate Wallet' }),
          click: () => {
            // openExternal('url')
          },
        },
      ],
    },
  ]

  return template
}

/**
 * Open the given external protocol URL in the desktop’s default manner.
 */
const openExternal = (url) => {
  // console.log(`openExternal: ${url}`)
  shell.openExternal(url)
}
