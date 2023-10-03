import fs from 'fs'
import yaml from 'js-yaml'
import os from 'os'
import path from 'path'
import packageJson from '../../package.json'

const version = packageJson.version

declare const process: {
  env: {
    CADT_API_SERVER_HOST: string
    CADT_UI_HOST: string
    CADT_API_KEY: string
  }
}

interface Config {
  cadtApiServerHosts: string[]
  cadtUiHost: string
  apiTimeout: number
  version: string
  cadtApiKey: string
}

const defaultConfig: Config = {
  cadtApiServerHosts: [process.env.CADT_API_SERVER_HOST],
  cadtUiHost: process.env.CADT_UI_HOST,
  cadtApiKey: process.env.CADT_API_KEY,
  apiTimeout: 20 * 1000,
  version: version,
}

const homeDir = os.homedir()
const persistanceFolderPath = `${homeDir}/.chia/mainnet/climate-wallet`
const configFilePath = path.resolve(`${persistanceFolderPath}/config.yaml`)

export const getConfig = (): Config => {
  try {
    if (!fs.existsSync(configFilePath)) {
      try {
        if (!fs.existsSync(persistanceFolderPath)) {
          fs.mkdirSync(persistanceFolderPath, { recursive: true })
        }

        fs.writeFileSync(configFilePath, yaml.dump(defaultConfig), 'utf8')
      } catch (err) {
        return defaultConfig
      }
    }

    try {
      const yml = yaml.load(fs.readFileSync(configFilePath, 'utf8'))
      return yml
    } catch (e) {
      console.log(`Config file not found at ${configFilePath}`, e)
      return defaultConfig
    }
  } catch (e) {
    console.log(`Config file not found at ${configFilePath}`, e)

    return defaultConfig
  }
}

export const updateConfig = (updates) => {
  try {
    const currentConfig = getConfig()
    const updatedConfig = { ...currentConfig, ...updates }
    fs.writeFileSync(configFilePath, yaml.dump(updatedConfig), 'utf8')
  } catch (e) {
    console.log(`Could not update config file`, e)
  }
}

export const checkConfig = () => {
  const configVersion = getConfig().version || '0.0.0'

  if (version > configVersion) {
    updateConfig({
      ...defaultConfig,
      ...getConfig(),
      version: version,
    })
  }
}
