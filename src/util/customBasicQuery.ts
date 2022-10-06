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
    'b9883e706d1c70ab0a7c4192c4e21b34d030041028b56348ee445d59051f1e51', //CAT ASSET ID
  registryLogo:
    'https://hash.green/_next/image?url=https%3A%2F%2Fimages.taildatabase.com%2Ftails%2F86b8ebab-7d76-4321-972a-a57b23dbf5b4.jpeg&w=96&q=75',
  //new column

  sequence_num: 0,
  index: '0x748d157500dca14e722a371bc401eee862c1789ed589b8715bdde905e5018fb5',
  public_key:
    '0xac50099214519492dafc4331410d19005e4f9b38cfbd1163f4ba11280acfc070433045b253b8ca62b76ded95d6feba24',
  asset_id:
    '0xb9883e706d1c70ab0a7c4192c4e21b34d030041028b56348ee445d59051f1e51',
  tokenization: {
    mod_hash:
      '0x32a5c056bc95af75118ca302a21fefdcddae7d178dc32fe293ff929cb0d5edd2',
    public_key:
      '0x877cc6dbd1bf77cd9c54b1672b6fe1a3afae4204ae23263a83ef9047d8b4be44fc5c2c8d030b677b0cd9db7fad81a98e',
  },
  detokenization: {
    mod_hash:
      '0xe9318c3acd6a51d0c1d98ae1978ac9ca88f1f820fbdb9731bd6534666639c5ba',
    public_key:
      '0x887064163d4b9f8d85340c044a3541348a29510ec61c70aef5a5baac635f5ba78105b49ee025f8d148db8e32ada8e1b6',
    signature:
      '0x99efb2853a9ecf141b7a3f1b30fabc72fccf245edd7ce9723c17611c8a0d1704c1a0999d003a6e54535ca39f7ed640600628ab0dc262d9fd4e6436ff4b5d4fad272b303c6b8ea84d5f47d69c3a75b44001a5da1af201c16b38ce0d4559ed8641',
  },
  permissionless_retirement: {
    mod_hash:
      '0x4640a3fecf9073d3eb39c755ab49b7a0ad74163d1d8bbe320ccd482d9642bc2f',
    signature:
      '0x81e48a44ef85e78bd22003c09c977909671c4abb1c844f771b2808de5d02c79efd373f597a48d210f0beeb479b60d730079e92bd2d55a3844d6ea17ee52648923c2d7e86ba5b4e6e128469ae200b1ae47d96f48da8db0918e361cd0dc3ed57ba',
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
