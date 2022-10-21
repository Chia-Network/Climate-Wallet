import type {
  Detokenization,
  Retirement,
  Tokenization,
  TokenMetaData,
} from './ClimateServiceType'

export interface Issuance {
  id: string
  orgUid: string
  warehouseProjectId: string
  startDate: string
  endDate: string
  verificationApproach: string
  verificationReportDate: string
  verificationBody: string
  timeStaged: string
  createdAt: string
  updatedAt: string
}

export interface CWAsset {
  warehouseUnitId: string
  issuanceId: string
  projectLocationId: string
  projectDeveloper: string
  projectId: string
  projectLink: string
  currentRegistry: string
  projectName: string
  unitOwner: string
  orgUid: string
  countryJurisdictionOfOwner: string
  inCountryJurisdictionOfOwner: string | null
  vintageYear: string
  unitType: string
  marketplace: string
  marketplaceLink: string
  marketplaceIdentifier: string | null
  registryLogo: string
  sequence_num: number
  index: string
  public_key: string
  asset_id: string
  tokenization: Tokenization
  detokenization: Detokenization
  permissionless_retirement: Retirement
  issuance: Issuance
}

export type CWAssetIds = string[]

export interface ApiRes<T> {
  data: T
  status: number
}

interface Project {}

interface Unit {}
