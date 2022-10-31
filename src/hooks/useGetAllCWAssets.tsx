import {
  useGetAllCWAssetQuery,
  useGetAllCWProjectQuery,
  useGetAllOrganizationsQuery,
  useGetCWMetaDataQuery,
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

  const {
    data: projects,
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useGetAllCWProjectQuery('')

  const isLoading =
    isLoadingAssets || isLoadingOrganizations || isLoadingProjects
  const error = errorAssets || errorOrganizations || errorProjects

  const data = useMemo(() => {
    if (assets && Array.isArray(assets) && organizations && projects) {
      return assets.map((asset) => {
        const orgInfo = organizations[asset.orgUid]
        const project = projects.find(
          (p) => p.warehouseProjectId === asset?.issuance?.warehouseProjectId
        )

        return {
          ...asset,
          ...project,
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
    data: metadata,
    isLoading: isLoadingMetadata,
    error: errorMetadata,
  } = useGetCWMetaDataQuery(asset?.orgUid, {
    skip: !asset?.issuance?.orgUid,
  })

  const data = useMemo(() => {
    if (asset && metadata) {
      let json = {}
      const key = `meta_0x${checkMarketplaceIdentifier(
        asset?.marketplaceIdentifier
      )}`

      try {
        if (metadata[key]) {
          json = JSON.parse(metadata[key])
        }
      } catch (error) {}

      return { ...asset, ...json }
    }
  }, [asset, metadata])

  const isLoading = isLoadingAssets || isLoadingMetadata
  const error = errorAssets || errorMetadata

  return { data, isLoading, error }
}
