import { TokenType } from '@/components/token'
import { CARBON_TOKEN_UNIT as unit } from '@/constants/unit'
import { FormatLargeNumber } from '@/util/token'
import { Transaction, TransactionType } from '@chia/api'
import { mojoToCAT, mojoToChia, useCurrencyCode } from '@chia/core'
import moment from 'moment'
import useWalletTransactions from './useWalletTransactions'

export type TransactionHistory = Transaction & {
  historyType: TokenType
  historyTypeString: string
  status: string
  date: string
  unitCount: string
  fee: string
}

export default function useWalletTransactionsHistory(
  walletId: number,
  defaultRowsPerPage = 10,
  defaultPage = 0,
  sortKey?: 'CONFIRMED_AT_HEIGHT' | 'RELEVANCE',
  reverse?: boolean
): {
  isLoading: boolean
  transactionsHistory?: TransactionHistory[]
  count?: number
  error?: Error
  page: number
  rowsPerPage: number
  pageChange: (rowsPerPage: number, page: number) => void
} {
  const feeUnit = useCurrencyCode()

  const {
    transactions: rawTransactions,
    count,
    page,
    rowsPerPage,
    isLoading,
    error,
    pageChange,
  } = useWalletTransactions(
    walletId,
    defaultRowsPerPage,
    defaultPage,
    sortKey,
    reverse
  )

  const transactionsHistory = rawTransactions?.map(
    (transaction): TransactionHistory => {
      const {
        confirmed: isConfirmed,
        createdAtTime,
        type,
        amount,
        feeAmount,
      } = transaction

      const isOutgoing = [
        TransactionType.OUTGOING,
        TransactionType.OUTGOING_TRADE,
      ].includes(type)

      const historyType: TokenType =
        type === TokenType.Default
          ? isOutgoing
            ? TokenType.Send
            : TokenType.Receive
          : type

      return {
        ...transaction,
        historyType: historyType,
        historyTypeString: TokenType[historyType].toString(),
        status: isConfirmed ? 'Confirmed' : 'Pending',
        date: moment(createdAtTime * 1000).format('LLL'),
        unitCount: `${isOutgoing ? '-' : '+'} ${FormatLargeNumber(
          mojoToCAT(amount)
        )} ${unit}`,
        fee: `${FormatLargeNumber(mojoToChia(feeAmount))} ${feeUnit}`,
      }
    }
  )

  return {
    transactionsHistory,
    count,
    page,
    rowsPerPage,
    isLoading,
    error,
    pageChange,
  }
}
