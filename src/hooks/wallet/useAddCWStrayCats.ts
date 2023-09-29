import { useGetAllCWAssets } from '@/hooks/useGetAllCWAssets'
import { checkMarketplaceIdentifier } from '@/util/token'
import { useAddCATTokenMutation, useGetStrayCatsQuery } from '@chia/api-react'
import { useEffect, useState } from 'react'

export default function useCWAddStrayCats(): {
  isLoadingAddStrayCats: boolean
} {
  const [isLoadingAddStrayCats, setIsLoadingAddStrayCats] =
    useState<boolean>(true)

  const [addCATToken] = useAddCATTokenMutation()
  const { data: allCWAssets, isLoading: isGetAllCWAssetsLoading } =
    useGetAllCWAssets()
  const { data: strayCats, isLoading: isGetStrayCatsLoading } =
    useGetStrayCatsQuery(undefined, {
      pollingInterval: 10000,
    })

  const handleAddCat = async (strayCat) => {
    const { assetId, name } = strayCat
    try {
      const res = await addCATToken({
        name: name,
        assetId: assetId,
        fee: '0',
      }).unwrap()
      return res
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    if (
      !isGetAllCWAssetsLoading &&
      !isGetStrayCatsLoading &&
      allCWAssets &&
      strayCats
    ) {
      Promise.all(
        strayCats.map((strayCat) => {
          const { assetId } = strayCat
          if (
            allCWAssets.some(
              (cw) =>
                checkMarketplaceIdentifier(cw.marketplaceIdentifier) === assetId
            )
          ) {
            return handleAddCat(strayCat)
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
