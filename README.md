# Climate Wallet

This repository holds the source code for the Climate Wallet in the Climate Portal system.

Note this wallet is explicitly as an independent plugin to the official [Chia Wallet](https://www.chia.net/downloads/).

## Hierarchy

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

## Prerequisite

You will need a running instance of [Chia Wallet](https://www.chia.net/downloads/) before the next steps.

## Usage

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

### Package and run app

- Build react and electron

  ```sh
  npm run build
  ```

- Package the app

  ```sh
  npm run packaging
  ```
