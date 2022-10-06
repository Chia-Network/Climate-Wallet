import { climateServiceApi } from '@/services/climateService'
import { climateWarehouseApi } from '@/services/climateWarehouse'
import { chiaApi, createStore } from '@chia/api-react'
import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import apiReducer from './slices/api'
import walletReducer from './slices/wallet'

export const store = configureStore({
  reducer: {
    [chiaApi.reducerPath]: chiaApi.reducer,
    [climateWarehouseApi.reducerPath]: climateWarehouseApi.reducer,
    [climateServiceApi.reducerPath]: climateServiceApi.reducer,

    api: apiReducer,
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      chiaApi.middleware,
      climateWarehouseApi.middleware,
      climateServiceApi.middleware
    ),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
