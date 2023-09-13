import { CWAsset } from '@/types/ClimateWarehouseType'
import multipleCWQuery from '@/util/multipleCWQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

export const climateWarehouseServiceApi = createApi({
  reducerPath: 'climateWarehouseServiceApi',
  baseQuery: multipleCWQuery(),
  endpoints: (builder) => ({
    // get all units
    getAllCWAsset: builder.query<CWAsset[], any>({
      query: () => ({
        url: '/v1/units',
        params: {
          hasMarketplaceIdentifier: true,
          includeProjectInfoInSearch: true,
        },
        method: 'get',
      }),
    }),

    // get one unit by warehouseUnitId
    getCWAssetById: builder.query({
      query: (warehouseUnitId) => ({
        url: '/v1/units',
        params: { warehouseUnitId },
        method: 'get',
      }),
    }),

    // get all organizations
    getAllOrganizations: builder.query({
      query: () => ({
        url: '/v1/organizations',
        method: 'get',
      }),
    }),

    // get all project
    getAllCWProject: builder.query({
      query: () => ({
        url: '/v1/projects',
        params: { onlyTokenizedProjects: true },
        method: 'get',
      }),
    }),

    // get one project by warehouseProjectId
    getCWProjectById: builder.query({
      query: (warehouseProjectId) => ({
        url: '/v1/projects',
        params: { warehouseProjectId },
        method: 'get',
      }),
    }),

    // get one project by orgUid
    getCWMetaData: builder.query({
      query: (orgUid) => ({
        url: '/v1/organizations/metadata',
        params: { orgUid },
        method: 'get',
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
