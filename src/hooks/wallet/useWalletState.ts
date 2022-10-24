import getWalletSyncingStatus from '@/util/getWalletSyncingStatus'
import { SyncingStatus } from '@chia/api'
import { useGetSyncStatusQuery } from '@chia/api-react'

export default function useWalletState(): {
  isLoading: boolean
  state?: SyncingStatus
} {
  const { data: walletState, isLoading } = useGetSyncStatusQuery(
    {},
    {
      pollingInterval: 10000,
    }
  )

  return {
    isLoading,
    state: walletState && getWalletSyncingStatus(walletState),
  }
}
