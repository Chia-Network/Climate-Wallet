export interface RequestInput {
  amount: number
  passphrase: string
  fee: string
}

export interface CancelInput {
  fee: string
}

export enum CancelStep {
  Input = 0,
  Result = 1,
}

export type BlockingList = {
  walletId: string
  txId?: string
  amount: string
  content: string
  passphrase: string
}[]
