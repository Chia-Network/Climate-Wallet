import { CWAsset } from '@/types/ClimateWarehouseType'
import { getConfig } from '@/util/yamlConfigLoader'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const serviceURL =
  getConfig().climateWarehouses[0] || process.env.CLIMATE_WAREHOUSE

export const climateWarehouseServiceApi = createApi({
  reducerPath: 'climateWarehouseServiceApi',
  baseQuery: fetchBaseQuery({ baseUrl: serviceURL }),
  endpoints: (builder) => ({
    //get all units
    getAllCWAsset: builder.query<CWAsset[], any>({
      query: () => ({
        url: `v1/units`,
      }),
    }),
    //get one unit by warehouseUnitId
    getCWAssetById: builder.query({
      query: (warehouseUnitId) => ({
        url: `v1/units`,
        params: { warehouseUnitId },
      }),
    }),
    //get all organizations
    getAllOrganizations: builder.query({
      query: () => ({
        url: `v1/organizations`,
      }),
    }),
    //get all project
    getAllCWProject: builder.query({
      query: () => ({
        url: `v1/projects`,
      }),
    }),
    //get one project by warehouseProjectId
    getCWProjectById: builder.query({
      query: (warehouseProjectId) => ({
        url: `v1/projects`,
        params: { warehouseProjectId },
      }),
    }),

    //get one project by orgUid
    getCWMetaData: builder.query({
      query: (orgUid) => ({
        url: `v1/organizations/metadata`,
        params: { orgUid },
      }),
    }),
  }),
})

export const {
  useGetCWAssetByIdQuery,
  useGetAllCWAssetQuery,
  useGetCWProjectByIdQuery,
  useGetAllCWProjectQuery,
  useGetAllOrganizationsQuery,
  useGetCWMetaDataQuery,
} = climateWarehouseServiceApi
