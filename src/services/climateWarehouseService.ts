import { ApiRes, CWAsset, CWAssetIds } from '@/types/ClimateWarehouseType'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const serviceURL = process.env.CLIMATE_WAREHOUSE

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
    getAllCWAssetById: builder.query({
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
    //get on project by warehouseProjectId
    getAllCWProjectById: builder.query({
      query: (warehouseProjectId) => ({
        url: `v1/projects`,
        params: { warehouseProjectId },
      }),
    }),
  }),
})

export const {
  useGetAllCWAssetByIdQuery,
  useGetAllCWAssetQuery,
  useGetAllCWProjectByIdQuery,
  useGetAllCWProjectQuery,
  useGetAllOrganizationsQuery,
} = climateWarehouseServiceApi
