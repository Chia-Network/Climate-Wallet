import { defaultLocale, i18n, locales } from '@/config/locales'
import { WalletProvider } from '@/providers/WalletProvider'
import store from '@/store/store'
import { dark, light } from '@/theme'
import sleep from '@/util/sleep'
import { api } from '@chia/api-react'
import {
  ErrorBoundary,
  LayoutLoading,
  LocaleProvider,
  ModalDialogs,
  ModalDialogsProvider,
  useDarkMode,
} from '@chia/core'
import { Trans } from '@lingui/macro'
import React, { ReactNode, Suspense, useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { Outlet } from 'react-router-dom'
import WebSocket from 'ws'
import AppState from './AppState'
import AppThemeProviders from './AppThemeProviders'

async function waitForConfig() {
  while (true) {
    // @ts-ignore
    const config = await window.ipcRenderer.invoke('getConfig')
    if (config) {
      return config
    }

    await sleep(50)
  }
}

type AppProps = {
  outlet?: boolean
  children?: ReactNode
}

export default function App(props: AppProps) {
  const { children, outlet } = props
  const [isReady, setIsReady] = useState<boolean>(false)
  const { isDarkMode } = useDarkMode()

  const theme = isDarkMode ? dark : light

  async function init() {
    const config = await waitForConfig()
    const { cert, key, url } = config

    store.dispatch(
      api.initializeConfig({
        url,
        cert,
        key,
        webSocket: WebSocket,
      })
    )

    setIsReady(true)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Provider store={store}>
      <LocaleProvider
        i18n={i18n}
        defaultLocale={defaultLocale}
        locales={locales}
      >
        <AppThemeProviders theme={theme} fonts global>
          <ErrorBoundary>
            <WalletProvider>
              <ModalDialogsProvider>
                {isReady ? (
                  <Suspense fallback={<LayoutLoading />}>
                    <AppState>{outlet ? <Outlet /> : children}</AppState>
                  </Suspense>
                ) : (
                  <LayoutLoading>
                    <Trans>Loading configuration</Trans>
                  </LayoutLoading>
                )}
                <ModalDialogs />
              </ModalDialogsProvider>
            </WalletProvider>
          </ErrorBoundary>
        </AppThemeProviders>
      </LocaleProvider>
    </Provider>
  )
}
