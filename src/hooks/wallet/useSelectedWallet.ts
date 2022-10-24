import { useGetAllCWAssetsById } from '@/hooks/useGetAllCWAssets'
import { useWallet } from '@/hooks/wallet'
import { useAppDispatch, useTypedSelector } from '@/store'
import { setWalletId as slicesSetWalletId } from '@/store/slices/wallet'
import { useGetCATAssetIdQuery } from '@chia/api-react'

const useSelectedWallet = () => {
  const walletId = useTypedSelector((state) => state.wallet.walletId)
  const wallets = useWallet(walletId)
  const { data: assetId } = useGetCATAssetIdQuery({ walletId: walletId })
  const {
    data: asset,
    isLoading: isLoadingAsset,
    error: errorAsset,
  } = useGetAllCWAssetsById(assetId)

  const dispatch = useAppDispatch()
  const setWalletId = (newWalletId: string | number | undefined) => {
    if (newWalletId === undefined) {
      return
    }
    dispatch(slicesSetWalletId(newWalletId.toString()))
  }

  return {
    ...wallets,
    walletId,
    setWalletId,
    assetId,
    asset,
    isLoadingAsset,
    errorAsset,
  }
}

export default useSelectedWallet
