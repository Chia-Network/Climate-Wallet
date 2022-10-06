import { SyncingStatus } from '@chia/api'
import { toast } from 'react-toastify'
import isNumeric from 'validator/es/lib/isNumeric'
interface ValidType {
  address?: string
  amount: string
  fee: string
}

const transactionValidCheck = <T extends ValidType>(
  data: Pick<T, 'address' | 'fee' | 'amount'>,
  state: any
): boolean => {
  if (state !== SyncingStatus.SYNCED) {
    toast.warn('Not SYNCED!!')
    return false
  }

  const amount = data.amount.trim()
  if (!isNumeric(amount)) {
    toast.warn('amount error!!')
    return false
  }

  const fee = data.fee.trim() || '0'
  if (!isNumeric(fee)) {
    toast.warn('fee error!!')
    return false
  }

  if (data.address) {
    const address = data.address

    if (address.includes('colour')) {
      return false
    }

    if (address.includes('chia_addr') || address.includes('colour_desc')) {
      return false
    }
  }

  return true
}

export default transactionValidCheck
