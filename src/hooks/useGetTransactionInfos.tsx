import { CWAsset } from '@/types/ClimateWarehouseType'
import { Trans } from '@lingui/macro'

interface Props {
  cwAsset?: CWAsset
  balance: string
}

const useGetTransactionInfos = ({ cwAsset, balance }: Props) => {
  return [
    { subtitle: <Trans>Project Name</Trans>, value: cwAsset?.projectName },
    { subtitle: <Trans>Vintage Year </Trans>, value: cwAsset?.vintageYear },
    {
      subtitle: <Trans>Current Registry</Trans>,
      value: cwAsset?.currentRegistry,
    },
    {
      subtitle: <Trans>Quantity Held</Trans>,
      value: balance,
    },
  ]
}

export default useGetTransactionInfos
