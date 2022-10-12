import { CWAsset } from '@/types/ClimateWarehouseType'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import sleep from './sleep'

//TODO: fake data and query,replace when RXDU finish it.
const fakeAhWeiCWAsset: CWAsset = {
  warehouseUnitId: 'eb9e008f-f3d7-4731-af95-505839ddfb1a',
  issuanceId: 'fca95f9c-ccea-42d4-a757-31b092dbd343',
  projectLocationId: 'Thailand',
  projectName: 'chia project',
  projectDeveloper: 'KB Developement',
  projectId: 'GS1',
  projectLink: 'www.goldstandard.org',
  currentRegistry: 'chia Gold Standard',
  orgUid: '3e70df56ff67a6806df6ad101c159363845550d1f9afd81e3e0d5a5ab51af867',
  unitOwner: 'UK',
  countryJurisdictionOfOwner: 'Afghanistan',
  inCountryJurisdictionOfOwner: null,
  vintageYear: 2099,
  unitType: 'Removal - nature',
  marketplace: 'amazon',
  marketplaceLink: 'amazom.test',
  marketplaceIdentifier:
    '164de1d017ebcf5f3bdf52858abf21b067ba4352d6921b4d2fd2fa3be395f01f', //CAT ASSET ID
  registryLogo:
    'https://hash.green/_next/image?url=https%3A%2F%2Fimages.taildatabase.com%2Ftails%2F86b8ebab-7d76-4321-972a-a57b23dbf5b4.jpeg&w=96&q=75',
  //new column
  sequence_num: 0,
  index: '0x748d157500dca14e722a371bc401eee862c1789ed589b8715bdde905e5018fb5',
  public_key:
    '0x9650dc15356ba1fe3a48e50daa55ac3dfde5323226922c9bf09aae1bd9612105f323e573cfa0778c681467a0c62bc315',
  asset_id:
    '0x164de1d017ebcf5f3bdf52858abf21b067ba4352d6921b4d2fd2fa3be395f01f',
  tokenization: {
    mod_hash:
      '0xc43d047c7bf8881a3f87ea013fac0d0fa1a2712fb546ac983097b9f3938301ea',
    public_key:
      '0x8cba9cb11eed6e2a04843d94c9cabecc3f8eb3118f3a4c1dd5260684f462a8c886db5963f2dcac03f54a745a42777e7c',
  },
  detokenization: {
    mod_hash:
      '0xd2c993dd5698df7b15655b9fb3689399fb3721e7279d5ab4b4782568d5c264a1',
    public_key:
      '0xb431835fe9fa64e9bea1bbab1d4bffd15d17d997f3754b2f97c8db43ea173a8b9fa79ac3a7d58c80111fbfdd4e485f0d',
    signature:
      '0x900aa7bb922a6c98933952e1574ca4cc503642a2b3dfebefcae939bcc1bd994e206c5b5948db9667338f0c3b9eae2aa013431018739be76a48432401d38f70fdd285862649ea997dbf6a6d732d17e6f0ae914705630a5e8b0588cfa33a5d9327',
  },
  permissionless_retirement: {
    mod_hash:
      '0x4640a3fecf9073d3eb39c755ab49b7a0ad74163d1d8bbe320ccd482d9642bc2f',
    signature:
      '0xb08805794d093467b213ff9a102a6255dbb624e1edfe1ba0b9781884524bc8c1a169d0b65332426427506df1e89f4c47153c083b2acdbba8bb617c20057a18676b816630f32a9ccf51df1d06494297abddb5e202e3fa1fb225090dfee14269eb',
  },
}

const fakeIvernCWAsset: CWAsset = {
  warehouseUnitId: 'eb9e008f-f3d7-4731-af95-505839ddfb1a',
  issuanceId: 'fca95f9c-ccea-42d4-a757-31b092dbd343',
  projectLocationId: 'Harry',
  projectName: 'green project',
  projectDeveloper: 'KB Developement',
  projectId: 'GS1',
  projectLink: 'www.goldstandard.org',
  currentRegistry: 'Harry Gold Standard',
  orgUid: '3e70df56ff67a6806df6ad101c159363845550d1f9afd81e3e0d5a5ab51af867',
  unitOwner: 'UK',
  countryJurisdictionOfOwner: 'Afghanistan',
  inCountryJurisdictionOfOwner: null,
  vintageYear: 2099,
  unitType: 'Removal - nature',
  marketplace: 'amazon',
  marketplaceLink: 'amazom.test',
  marketplaceIdentifier:
    '53c1ce8c9c042b8e75bbd63f9c83fb22503c8e7c7a28eda89d7bd9d386db527a', //CAT ASSET ID
  registryLogo:
    'https://testnet10.hash.green/_next/image?url=https%3A%2F%2Fimages.taildatabase.com%2Ftails%2F40c1ad9f-2e5b-41ef-9959-73a1a5d62651.png&w=96&q=75',
  //new column
  sequence_num: 0,
  index: '0x748d157500dca14e722a371bc401eee862c1789ed589b8715bdde905e5018fb5',
  public_key:
    '0xac50099214519492dafc4331410d19005e4f9b38cfbd1163f4ba11280acfc070433045b253b8ca62b76ded95d6feba24',
  asset_id:
    '0x53c1ce8c9c042b8e75bbd63f9c83fb22503c8e7c7a28eda89d7bd9d386db527a',
  tokenization: {
    mod_hash:
      '0x53aeeb02b8ee8bc164c4e385f016a7dc746e2891359a1968ac84236aa4d86c2a',
    public_key:
      '0x877cc6dbd1bf77cd9c54b1672b6fe1a3afae4204ae23263a83ef9047d8b4be44fc5c2c8d030b677b0cd9db7fad81a98e',
  },
  detokenization: {
    mod_hash:
      '0xe2cb8d435e5cf9d2cf162ceb36e8b1c7998fff46aba67a5d08d950c9629dbe44',
    public_key:
      '0x887064163d4b9f8d85340c044a3541348a29510ec61c70aef5a5baac635f5ba78105b49ee025f8d148db8e32ada8e1b6',
    signature:
      '0x843a65f9d96b15b7801a84f34a176b4baf272c63f52a605c042b1ebff258b18dc465dd767bb424603f2c893cb7bbe06602fc530bc12d6d5c8e605038b0142b93f89becf29ef65a6956998d1515e74cdc068218e3efd8c68ca19c58cd42f17925',
  },
  permissionless_retirement: {
    mod_hash:
      '0x4640a3fecf9073d3eb39c755ab49b7a0ad74163d1d8bbe320ccd482d9642bc2f',
    signature:
      '0x81e48a44ef85e78bd22003c09c977909671c4abb1c844f771b2808de5d02c79efd373f597a48d210f0beeb479b60d730079e92bd2d55a3844d6ea17ee52648923c2d7e86ba5b4e6e128469ae200b1ae47d96f48da8db0918e361cd0dc3ed57ba',
  },
}

const datas = [fakeAhWeiCWAsset, fakeIvernCWAsset]

const customBasicQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
    },
    unknown,
    unknown
  > =>
  async ({ url }) => {
    await sleep(500)

    const urlSplit = url.split('/')
    const method = urlSplit[0]
    const parm = urlSplit[1]

    switch (method) {
      case 'getAllCWAssetIds':
        return {
          data: datas.map((d) => d.marketplaceIdentifier),
          status: 200,
        }
      case 'getCWAssetById':
        return {
          data: datas.find((d) => d.marketplaceIdentifier === parm),
          status: 200,
        }
      case 'getCWAssetsByIds':
        return { data: datas, status: 200 }
      case 'getAllCWAssets':
        return {
          data: [fakeAhWeiCWAsset, fakeIvernCWAsset],
          status: 200,
        }
      default:
        return { data: fakeAhWeiCWAsset, status: 200 }
    }
  }

export default customBasicQuery
