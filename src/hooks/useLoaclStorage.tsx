import { BlockingList } from '@/types/DetokenizationType'
import useLocalStorage from './useReactUseLocalStorage'

export const useDetokenzationDialogShowLocalStorage = () => {
  return useLocalStorage<boolean>('DetokenzationDialogShow', false)
}

export const useDetokenzationBlockingList = (): {
  blockingList?: BlockingList
  setBlockingList: (newBlockingList?: BlockingList) => void
  isDetokenWallet: (walletId?: string | number) => boolean
} => {
  const [blockingList, setBlockingList] = useLocalStorage<BlockingList>(
    'DetokenzationBlockingList',
    []
  )
  const isDetokenWallet = (walletId?: string | number) => {
    if (blockingList) {
      return blockingList.some((b) => String(b.walletId) === String(walletId))
    }
    return false
  }

  return {
    blockingList,
    setBlockingList,
    isDetokenWallet,
  }
}
