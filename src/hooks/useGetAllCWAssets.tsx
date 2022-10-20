import {
  useGetAllCWAssetQuery,
  useGetAllOrganizationsQuery,
  useGetCWProjectByIdQuery,
} from '@/services/climateWarehouseService'
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
    if (assets) {
      return assets.find((item) => item.marketplaceIdentifier === assetId)
    }
    return null
  }, [assets, assetId])

  const {
    data: project,
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useGetCWProjectByIdQuery(asset?.issuance?.warehouseProjectId)

  const data = useMemo(() => {
    if (asset && project) {
      return { ...asset, ...project }
    }
  }, [asset, project])

  const isLoading = isLoadingAssets || isLoadingProjects
  const error = errorAssets || errorProjects

  return { data, isLoading, error }
}
