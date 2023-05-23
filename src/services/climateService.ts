import {
  DetokenizationTxRequest,
  DetokenizationTxResponse,
  RetirementTxRequest,
  RetirementTxResponse,
  TX,
} from '@/types/ClimateServiceType'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const serviceURL = `${process.env.CLIMATE_TOKEN_DRIVER_HOST}:${process.env.CLIMATE_TOKEN_DRIVER_HOST_PORT}`

export const climateServiceApi = createApi({
  reducerPath: 'climateServiceApi',
  baseQuery: fetchBaseQuery({ baseUrl: serviceURL }),

  endpoints: (builder) => ({
    getTransactions: builder.query<any, any>({
      query: (data) => ({
        url: `/v1/transactions`,
        params: { ...data },
      }),
    }),
    getTransactionById: builder.query<TX, { txId?: string }>({
      query: ({ txId }) => ({
        url: `/v1/transactions/${txId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    creatDetokenizationTx: builder.mutation<
      DetokenizationTxResponse,
      DetokenizationTxRequest
    >({
      query: ({ assetId, data }) => ({
        url: `/v1/tokens/${assetId}/request-detokenization`,
        method: 'PUT',
        body: data,
      }),
    }),
    createRetirementTx: builder.mutation<
      RetirementTxResponse,
      RetirementTxRequest
    >({
      query: ({ assetId, data }) => ({
        url: `/v1/tokens/${assetId}/permissionless-retire`,
        method: 'PUT',
        body: data,
      }),
    }),
    getRetireKeys: builder.mutation<
      {
        hex: string
        bech32m: string
      },
      any
    >({
      query: () => ({
        url: `/v1/keys`,
        params: { derivation_index: 0, prefix: 'bls1238', hardened: false },
      }),
    }),
    getRetireKeysParse: builder.mutation<
      {
        hex?: string
        bech32m?: string
      },
      {
        address: string
      }
    >({
      query: ({ address }) => ({
        url: `/v1/keys/parse`,
        params: { address: address },
      }),
    }),
  }),
})

export const {
  useCreatDetokenizationTxMutation,
  useGetTransactionByIdQuery,
  useCreateRetirementTxMutation,
  useGetTransactionsQuery,
  useGetRetireKeysMutation,
  useGetRetireKeysParseMutation,
} = climateServiceApi
