import { useGetWalletsBalanceMutation } from '@/services/chiaWalletsService'
import { WalletListItem } from '@/types/WalletType'
import { useEffect } from 'react'

export default function useWalletsBalance(wallets: WalletListItem[]) {
  const [getWalletsBalance] = useGetWalletsBalanceMutation()

  useEffect(() => {
    Promise.all(
      wallets.map((wallet) => {
        console.log(wallet)
        const { walletId } = wallet
        return getWalletsBalance({ walletId }).unwrap()
      })
    ).then((data) => {
      console.log(data)
    })
  }, [wallets])
}
