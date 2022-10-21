import { climateServiceApi } from '@/services/climateService'
import { climateWarehouseApi } from '@/services/climateWarehouse'
import { climateWarehouseServiceApi } from '@/services/climateWarehouseService'
import { chiaApi } from '@chia/api-react'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import apiReducer from './slices/api'
import walletReducer from './slices/wallet'

export const store = configureStore({
  reducer: {
    [chiaApi.reducerPath]: chiaApi.reducer,
    [climateWarehouseApi.reducerPath]: climateWarehouseApi.reducer,
    [climateWarehouseServiceApi.reducerPath]:
      climateWarehouseServiceApi.reducer,
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
      climateServiceApi.middleware,
      climateWarehouseServiceApi.middleware
    ),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
