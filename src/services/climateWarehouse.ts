import { ApiRes, CWAsset, CWAssetIds } from '@/types/ClimateWarehouseType'
import customBasicQuery from '@/util/customBasicQuery'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const serviceURL = 'serviceURL'

export const climateWarehouseApi = createApi({
  reducerPath: 'climateWarehouseApi',
  baseQuery: customBasicQuery({ baseUrl: serviceURL }),
  endpoints: (builder) => ({
    getAllCWAssetIds: builder.query<CWAsset[], any>({
      query: () => ({
        url: `getAllCWAssetIds`,
      }),
    }),
    getCWAssetById: builder.query<CWAsset, string>({
      query: (marketplaceIdentifier) => ({
        url: `getCWAssetById/${marketplaceIdentifier}`,
      }),
    }),
    getCWAssetsByIds: builder.query<
      CWAsset[],
      { marketplaceIdentifier: string }[]
    >({
      query: (array) => ({
        url: `getCWAssetsByIds`,
        method: 'POST',
        body: array,
      }),
    }),
    getAllCWAssets: builder.query<CWAsset[], any>({
      query: () => ({
        url: `getAllCWAssets`,
      }),
    }),
  }),
})

export const {
  useGetAllCWAssetIdsQuery,
  useGetAllCWAssetsQuery,
  useGetCWAssetByIdQuery,
  useGetCWAssetsByIdsQuery,
} = climateWarehouseApi
