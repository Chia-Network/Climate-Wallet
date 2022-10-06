export type InputType = {
  address: string
  amount: string
  fee: string
  memo: string
}

export enum SendStep {
  Input = 0,
  Review = 1,
  Result = 2,
}
