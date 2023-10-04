import { CWAsset } from '@/types/ClimateWarehouseType'
import { Trans } from '@lingui/macro'

interface Props {
  cwAsset?: CWAsset
  balance: string
}

const useGetTransactionInfos = ({ cwAsset, balance }: Props) => {
  const info = [
    { subtitle: <Trans>Project Name</Trans>, value: cwAsset?.projectName },
    { subtitle: <Trans>Vintage Year </Trans>, value: cwAsset?.vintageYear },
    {
      subtitle: <Trans>Current Registry</Trans>,
      value: cwAsset?.currentRegistry,
    },
    {
      subtitle: <Trans>Active Token Balance</Trans>,
      value: balance,
    },
  ]

  if (cwAsset?.sequence_num !== 0) {
    info.push({
      subtitle: <Trans>Type</Trans>,
      value: cwAsset?.sequence_num,
    })
  }

  return info
}

export default useGetTransactionInfos
