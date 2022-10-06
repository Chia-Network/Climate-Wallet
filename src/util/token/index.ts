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
