export interface Tokenization {
  mod_hash: string
  public_key: string
}

export interface Detokenization {
  mod_hash: string
  public_key: string
  signature: string
}

export interface Rermissionless_retirement {
  mod_hash: string
  signature: string
}

export interface TokenBasicData {
  org_uid: string
  warehouse_project_id: string
  vintage_year: string
  sequence_num: number
}

export interface TokenMetaData extends TokenBasicData {
  index: string
  public_key: string
  asset_id: string
}

export interface DetokenizationTxRequest {
  assetId: string
  data: {
    token: { detokenization: Detokenization } & TokenMetaData
    payment: {
      amount: string
      fee: string
    }
  }
}

export interface DetokenizationTxResponse {
  token: TokenBasicData
  content: string
}

export interface RetirementTailMetadata {
  signature: string
}

export interface RetirementTxRequest {}

export interface RetirementTxResponse {}
