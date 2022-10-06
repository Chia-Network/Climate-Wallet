import { WalletType } from '@chia/api'

export type WalletListItem = {
  id: number | string
  type: 'WALLET' | 'CAT_LIST' | 'STRAY_CAT'
  walletType: WalletType
  hidden: boolean
  name: string
  walletId?: number // walletId or assetId
  assetId?: string
}

export type StrayCat = {
  assetId: string
  name: string
  firstSeenHeight: number
  senderPuzzleHash: string
  inTransaction: boolean
}
