export interface RequestInput {
  amount: number
  passphrase: string
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
}[]
