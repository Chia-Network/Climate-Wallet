export type InputType = {
  amount: string
  fee: string
  beneficiary: string
  publicKey: string
}

export enum RetireStep {
  Input = 0,
  Review = 1,
  Result = 2,
}
