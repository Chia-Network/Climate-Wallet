import { TokenType } from '@/components/token'
import { CARBON_TOKEN_UNIT as unit } from '@/constants/unit'
import { Transaction, TransactionType } from '@chia/api'
import { mojoToCAT, mojoToChia } from '@chia/core'
import { useLocale } from '@chia/core/'
import { Trans } from '@lingui/macro'
import BigNumber from 'bignumber.js'
import moment from 'moment'

export const getMemosDescription = (
  memos: string[]
): {
  state: boolean
  value: string[]
} => {
  const memoValues = memos ? Object.values(memos) : []
  const memoValuesDecoded = memoValues.map((memoHex) => {
    try {
      const buf = new Buffer(String(memoHex), 'hex')
      const decodedValue = buf.toString('utf8')

      const bufCheck = Buffer.from(decodedValue, 'utf8')
      if (bufCheck.toString('hex') !== memoHex) {
        throw new Error('Memo is not valid utf8 string')
      }

      return decodedValue
    } catch (error: any) {
      return memoHex
    }
  })

  // NOTE : if no memo, then it is 'Not Available'
  const state = memoValuesDecoded && memoValuesDecoded.length
  return {
    state: !!state, // number to boolean trick
    value: state ? memoValuesDecoded : ['Not Available'],
  }
}

export const FormatLargeNumber = (
  value: string | number | BigInt | BigNumber
) => {
  const [locale] = useLocale()

  const numberFormat = new Intl.NumberFormat(locale)

  if (typeof value === 'undefined' || value === null) {
    return value
  } else if (value instanceof BigNumber) {
    return bigNumberToLocaleString(value, locale)
  } else if (typeof value === 'bigint') {
    return BigInt(value).toLocaleString(locale)
  }
  return numberFormat.format(value)
}

const complexNumber = 1234567.0123456789

export default function bigNumberToLocaleString(
  value: BigNumber,
  locale?: string
): string {
  const formatter = Intl.NumberFormat(locale)
  if (!formatter) {
    throw new Error(`Formatter for ${locale} is not supported`)
  }

  const decimalFormatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 12,
  })
  if (!decimalFormatter) {
    throw new Error(`Decimal formatter for ${locale} is not supported`)
  }

  const parts = decimalFormatter.formatToParts(complexNumber)

  const decimalPart = parts.find((part) => part.type === 'decimal')
  const groupPart = parts.find((part) => part.type === 'group')

  const reversedParts = parts.slice().reverse()
  const integerPart = reversedParts.find((part) => part.type === 'integer')

  const format = {
    prefix: '',
    decimalSeparator: decimalPart?.value ?? '.',
    groupSeparator: groupPart?.value ?? ',',
    groupSize: integerPart?.value?.length ?? 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
    suffix: '',
  }

  return value.toFormat(format)
}

export const transactionToHistory = (
  transaction: Transaction,
  feeUnit: string
) => {
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
    historyType: historyType,
    type: TokenType[historyType].toString(),
    status: isConfirmed ? 'Confirmed' : 'Pending',
    date: moment(createdAtTime * 1000).format('LLL'),
    unitCount: `${isOutgoing ? '+' : '-'} ${FormatLargeNumber(
      mojoToCAT(amount)
    )} ${unit}`,
    fee: `${FormatLargeNumber(mojoToChia(feeAmount))} ${feeUnit}`,
  }
}
