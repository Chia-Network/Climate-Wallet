# Climate Wallet

This repository holds the source code for the Climate Wallet in the Climate Portal system.

Note this wallet is explicitly as an independent plugin to the latest official [Chia Wallet](https://www.chia.net/downloads/).

# Hierarchy

- `src`:
  - `assets`: fonts and images
  - `components`: react components
  - `config`: this project configs (env locales)
  - `constants`: this project constants
  - `electron`: electron start code
  - `hooks`: react custom hooks
  - `pages`: react page
  - `services`: rtk query service for api
  - `store`: redux store
  - `theme`: material-ui theme setting
  - `types`: typescript types
  - `util`: this project utilities

# Usage

## Prerequisite

You will need a running instance of [Chia Wallet](https://www.chia.net/downloads/) before the next steps.

### Installation and configuration

- Setpup submodule and follow submodule readme to stepup env

  ```sh
  git submodule update --init --recursive
  ```

- copy `.env` for submodule
  ```sh
  cp .env.submodule climate-token-driver/.env
  ```
- package submodule for dev and production

  ```sh
  npm run package-submodule
  ```

  submodule used `Climate Token Driver Suite` client service port `31314`

### Configurations

- A config.yaml file located at `./chia/mainnet/climate-wallet` is loaded, which adds to the configurations after .env. This part of the configuration is free to change by end binary users. When the application is opened, the new configurable would automatically apply.
- About config.yaml:
  - `cadtApiServerHosts`:links of climate action data trust api
  - `apiTimeout`: api request timeout
  - `cadtUiHost`:links of climate warehouses node
  - `version`: climate wallet version

### Run from source for development

- [Install nodejs](https://nodejs.org/en/)

- Make a `.env` file for your enviroment variables

  ```sh
  cp .env.example .env
  # change variable in .env
  ```

- Run main script

  ```sh
  npm i
  npm run dev
  ```

### Package app

- Windows

  ```sh
  #Build react and electron
  npm run build
  #Build submodule
  npm run package-submodule
  #Package the app
  npm run package-windows

  ```

- Mac

  ```sh
  #Build react and electron
  npm run build
  #Build submodule
  npm run package-submodule
  #Package the app
  npm run package-mac
  ```
