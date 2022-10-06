export interface Request<T> {
  data: T
  assetId: string
}

export interface Transaction {
  id: string
  record: any[]
}

export interface Token {
  org_uid: string
  project_id: string
  vintage_year: number
  sequence_num: number
}

export interface TokenOnChainBase {
  index: string
  public_key: string
  asset_id: string
}

export interface PaymentBase {
  amount: number
  fee: number
}

export interface DetokenizationTxRequest {
  token: TokenOnChainBase
  content: string
}

export interface DetokenizationTxResponse {
  token: Token
  tx: Transaction
}

export interface RetirementTailMetadata {
  signature: string
}

export interface RetirementTxRequest {
  token: {
    retirement: RetirementTailMetadata
  }
  payment: PaymentBase
}

export interface RetirementTxResponse {
  token: Token
  tx: Transaction
}
