import {
  DetokenizationTxRequest,
  DetokenizationTxResponse,
  Request,
  RetirementTxRequest,
  RetirementTxResponse,
} from '@/types/ClimateServiceType'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const serviceURL = process.env.CLIMATE_SERVICE

export const climateServiceApi = createApi({
  reducerPath: 'climateServiceApi',
  baseQuery: fetchBaseQuery({ baseUrl: serviceURL }),
  endpoints: (builder) => ({
    heathCheck: builder.query<any, any>({
      query: () => ({
        url: `/`,
      }),
    }),
    getTransactions: builder.query<any, any>({
      query: (data) => ({
        url: `/v1/transactions`,
        params: { ...data },
      }),
    }),
    getTransactionById: builder.query<any, any>({
      query: ({ txId }) => ({
        url: `/v1/transactions/${txId}`,
      }),
    }),
    creatDetokenizationTx: builder.mutation<any, any>({
      query: ({ assetId, data }) => ({
        url: `/v1/tokens/${assetId}/request-detokenization`,
        method: 'PUT',
        body: data,
      }),
    }),
    createRetirementTx: builder.mutation<any, any>({
      query: ({ assetId, data }) => ({
        url: `/v1/tokens/${assetId}/permissionless-retire`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

export const {
  useCreatDetokenizationTxMutation,
  useGetTransactionByIdQuery,
  useCreateRetirementTxMutation,
  useGetTransactionsQuery,
  useHeathCheckQuery,
} = climateServiceApi
