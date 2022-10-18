import { ApiRes, CWAsset, CWAssetIds } from '@/types/ClimateWarehouseType'
import customBasicQuery from '@/util/customBasicQuery'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const serviceURL = process.env.CLIMATE_WAREHOUSE

export const climateWarehouseApi = createApi({
  reducerPath: 'climateWarehouseApi',
  baseQuery: fetchBaseQuery({ baseUrl: serviceURL }),
  endpoints: (builder) => ({
    getAllCWAsset: builder.query<any, any>({
      query: () => ({
        url: `v1/units`,
      }),
    }),
    getAllCWAssetById: builder.query<any, any>({
      query: (warehouseUnitId) => ({
        url: `v1/units`,
        params: { warehouseUnitId },
      }),
    }),
    getAllCWPorject: builder.query<any, any>({
      query: () => ({
        url: `v1/projects`,
      }),
    }),
    getAllCWPorjectById: builder.query<any, any>({
      query: (warehouseProjectId) => ({
        url: `v1/projects`,
        params: { warehouseProjectId },
      }),
    }),
  }),
})

export const {} = climateWarehouseApi
