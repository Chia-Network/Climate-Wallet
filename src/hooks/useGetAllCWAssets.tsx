import {
  useGetAllCWAssetQuery,
  useGetAllOrganizationsQuery,
  useGetCWMetaDataQuery,
  useGetCWProjectByIdQuery,
} from '@/services/climateWarehouseService'
import { checkMarketplaceIdentifier } from '@/util/token'
import { useMemo } from 'react'

export function useGetAllCWAssets() {
  const {
    data: assets,
    isLoading: isLoadingAssets,
    error: errorAssets,
  } = useGetAllCWAssetQuery('')

  const {
    data: organizations,
    isLoading: isLoadingOrganizations,
    error: errorOrganizations,
  } = useGetAllOrganizationsQuery('')

  const isLoading = isLoadingAssets || isLoadingOrganizations
  const error = errorAssets || errorOrganizations

  const data = useMemo(() => {
    if (assets && organizations) {
      return assets.map((asset) => {
        const orgInfo = organizations[asset.orgUid]

        return {
          ...asset,
          registryLogo: orgInfo?.icon,
          currentRegistry: orgInfo?.name,
        }
      })
    }
    return []
  }, [assets, organizations])

  return { isLoading, data, error }
}

export function useGetAllCWAssetsById(assetId: string) {
  const {
    data: assets,
    isLoading: isLoadingAssets,
    error: errorAssets,
  } = useGetAllCWAssets()

  const asset = useMemo(() => {
    if (assets && assetId) {
      return assets.find(
        (item) =>
          checkMarketplaceIdentifier(item.marketplaceIdentifier) === assetId
      )
    }
    return null
  }, [assets, assetId])

  const {
    data: project,
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useGetCWProjectByIdQuery(asset?.issuance?.warehouseProjectId, {
    skip: !asset?.issuance?.warehouseProjectId,
  })

  const {
    data: metadata,
    isLoading: isLoadingMetadata,
    error: errorMetadata,
  } = useGetCWMetaDataQuery(asset?.orgUid, {
    skip: !asset?.issuance?.orgUid,
  })

  const data = useMemo(() => {
    if (asset && project && metadata) {
      let json = {}
      const key = `meta_0x${checkMarketplaceIdentifier(
        asset?.marketplaceIdentifier
      )}`

      try {
        if (metadata[key]) {
          json = JSON.parse(metadata[key])
        }
      } catch (error) {}

      return { ...asset, ...project, ...json }
    }
  }, [asset, project, metadata])

  const isLoading = isLoadingAssets || isLoadingProjects || isLoadingMetadata
  const error = errorAssets || errorProjects || errorMetadata

  return { data, isLoading, error }
}
