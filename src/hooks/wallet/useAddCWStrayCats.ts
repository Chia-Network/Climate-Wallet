import { useGetAllCWAssetsQuery } from '@/services/climateWarehouse'
import { WalletType } from '@chia/api'
import { useGetStrayCatsQuery } from '@chia/api-react'
import { useEffect, useState } from 'react'
import useWalletsList from './useWalletsList'

export default function useCWAddStrayCats(): {
  isLoadingAddStrayCats: boolean
} {
  const [isLoadingAddStrayCats, setIsLoadingAddStrayCats] =
    useState<boolean>(true)

  const { show: addStrayCat } = useWalletsList([WalletType.CAT], '')
  const { data: allCWAssets } = useGetAllCWAssetsQuery('')
  const { data: strayCats } = useGetStrayCatsQuery(undefined, {
    pollingInterval: 10000,
  })

  useEffect(() => {
    if (allCWAssets && strayCats) {
      Promise.all(
        strayCats.map((strayCat) => {
          const { assetId } = strayCat
          if (allCWAssets.some((cw) => cw.marketplaceIdentifier === assetId)) {
            return addStrayCat(assetId)
          } else {
            return Promise.resolve()
          }
        })
      ).then(() => {
        setIsLoadingAddStrayCats(false)
      })
    }
  }, [allCWAssets, strayCats])

  return {
    isLoadingAddStrayCats,
  }
}
