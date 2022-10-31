import SyncingStatus from '@/constants/SyncingStatus'
import { useWalletState } from '@/hooks/wallet'
import { useGetWalletsBalanceMutation } from '@/services/chiaWalletsService'
import { WalletListItem } from '@/types/WalletType'
import { useEffect, useState } from 'react'

export default function useWalletsBalance(wallets: WalletListItem[]): {
  isLoading: boolean
  data: number[]
} {
  const { state } = useWalletState()
  const isSynced = state === SyncingStatus.SYNCED

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<number[]>([])
  const [getWalletsBalance] = useGetWalletsBalanceMutation()

  useEffect(() => {
    // NOTE : if the wallet is still syncing, then do not return the balance
    if (isSynced) {
      Promise.all(
        wallets.map((wallet) => {
          const { walletId } = wallet
          return getWalletsBalance({ walletId }).unwrap()
        })
      ).then((walletBalances) => {
        setIsLoading(false)
        setData(
          walletBalances.map(
            (walletBalance) => walletBalance.confirmedWalletBalance
          )
        )
      })
    }
  }, [wallets, isSynced])

  return {
    isLoading,
    data,
  }
}
