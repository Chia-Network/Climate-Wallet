import { BlockingList } from '@/types/DetokenizationType'
import { useLocalStorage } from 'react-use'

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
    return (
      blockingList?.some(
        (b) => b.walletId === (walletId?.toString() ?? '-1')
      ) ?? false
    )
  }

  return {
    blockingList,
    setBlockingList,
    isDetokenWallet,
  }
}
