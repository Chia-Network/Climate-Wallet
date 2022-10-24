import { useLocale } from '@chia/core/'
import BigNumber from 'bignumber.js'

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

export function bigNumberToLocaleString(
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

export const checkMarketplaceIdentifier = (
  marketplaceIdentifier: string | null
) => {
  return marketplaceIdentifier === null
    ? ''
    : marketplaceIdentifier.startsWith('0x')
    ? marketplaceIdentifier
    : `0x${marketplaceIdentifier}`
}
