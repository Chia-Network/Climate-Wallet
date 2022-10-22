import { useGetWalletsBalanceMutation } from '@/services/chiaWalletsService'
import { WalletListItem } from '@/types/WalletType'
import { useEffect, useState } from 'react'

export default function useWalletsBalance(wallets: WalletListItem[]): {
  isLoading: boolean
  data: number[]
} {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<number[]>([])
  const [getWalletsBalance] = useGetWalletsBalanceMutation()

  useEffect(() => {
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
  }, [wallets])

  return {
    isLoading,
    data,
  }
}
