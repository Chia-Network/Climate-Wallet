import fs from 'fs'
import yaml from 'js-yaml'
import os from 'os'
import path from 'path'

declare const process: {
  env: {
    CLIMATE_WAREHOUSE: string
  }
}

interface Config {
  climateWarehouses: string[]
}

const defaultConfig: Config = {
  climateWarehouses: [process.env.CLIMATE_WAREHOUSE],
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
