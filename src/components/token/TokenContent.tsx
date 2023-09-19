import { CARBON_TOKEN_UNIT } from '@/constants/unit'
import { useDetokenzationBlockingList } from '@/hooks/useLoaclStorage'
import { useSelectedWallet, useWalletHumanValue } from '@/hooks/wallet'
import createDetokenFile from '@/util/createDetokenFile'
import { useGetWalletBalanceQuery } from '@chia/api-react'
import { Trans } from '@lingui/macro'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined'
import { Button, ButtonProps, Stack, Typography, useTheme } from '@mui/material'
import { PropsWithChildren, ReactNode, useMemo } from 'react'
import { useNavigate } from 'react-router'
import TokenCard from './TokenCard'
import { useGetAllCWAssetsById } from '@/hooks/useGetAllCWAssets'
import { useGetCATAssetIdQuery } from '@chia/api-react'
import { useGetCWMetaDataQuery } from '@/services/climateWarehouseService'

interface TokenContentButtonProps extends ButtonProps {
  text: ReactNode
  onClick: () => void
}

// NOTE : maybe just use styled component
const TokenContentButton = ({
  text,
  onClick,
  ...props
}: TokenContentButtonProps) => {
  return (
    <Button
      variant="contained"
      size="large"
      onClick={onClick}
      sx={{
        flex: 1,
        height: '64px',
        textTransform: 'uppercase',
      }}
      {...props}
    >
      <Typography variant="body1">{text}</Typography>
    </Button>
  )
}

interface IButtonStackProps {}

const ButtonStack = ({ children }: PropsWithChildren<IButtonStackProps>) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={3}
    >
      {children}
    </Stack>
  )
}

const TokenContent = () => {
  const theme = useTheme()

  const { walletId, wallet, unit } = useSelectedWallet()
  const { data: assetId } = useGetCATAssetIdQuery({ walletId })

  const { data: asset } = useGetAllCWAssetsById(assetId)

  const { data: metadata } = useGetCWMetaDataQuery(asset?.orgUid, {
    skip: !assetId,
  })

  const tailData = useMemo(() => {
    if (!metadata) {
      return undefined
    }

    const assetData = metadata?.[`meta_${asset?.asset_id}`]

    if (!assetData) {
      return undefined
    }

    return JSON.parse(assetData || {})?.detokenization?.signature
  }, [metadata, asset])

  const { isDetokenWallet, blockingList, setBlockingList } =
    useDetokenzationBlockingList()

  const detokenizationInfo = blockingList?.find(
    (item) => item.walletId === walletId
  )

  const isDetoken = isDetokenWallet(walletId)

  const navigate = useNavigate()

  const {
    data: walletBalance,
    isLoading: isLoadingWalletBalance,
    error,
  } = useGetWalletBalanceQuery(
    {
      walletId,
    },
    {
      pollingInterval: 10000,
    }
  )

  const confirmedWalletBalanceValue = useWalletHumanValue(
    wallet,
    walletBalance?.confirmedWalletBalance,
    unit ?? ''
  )

  const handleSend = () => {
    navigate(`/dashboard/wallets/send/${walletId}`)
  }

  const handleRetire = () => {
    navigate(`/dashboard/wallets/retire/${walletId}`)
  }

  const handleDetoken = () => {
    navigate(`/dashboard/wallets/detokenization/request/${walletId}`)
  }

  const handleCancelDetoken = () => {
    navigate(`/dashboard/wallets/detokenization/cancel/${walletId}`)
  }

  const handleDownloadRequest = () => {
    if (detokenizationInfo) createDetokenFile(detokenizationInfo)
  }

  return (
    <Stack spacing={4}>
      <Stack direction="row">
        <TokenCard
          icon={<AccountBalanceWalletOutlinedIcon />}
          title={<Trans>Quantity Held</Trans>}
        >
          <Stack direction="row" alignItems="flex-end" spacing={2}>
            <Typography
              variant="h4"
              color={theme.palette['other'].buttonTextGreen}
            >
              {confirmedWalletBalanceValue}
            </Typography>
            <Typography variant="body1" fontWeight={400}>
              {CARBON_TOKEN_UNIT}
            </Typography>
          </Stack>
        </TokenCard>
        {isDetoken && (
          <TokenCard
            icon={<PendingActionsOutlinedIcon />}
            title={<Trans>Detokenized Quantity</Trans>}
          >
            <Stack direction="row" alignItems="flex-end" spacing={2}>
              <Typography
                variant="h4"
                color={theme.palette['other'].buttonTextGreen}
              >
                {detokenizationInfo?.amount ?? 0}
              </Typography>
              <Typography variant="body1" fontWeight={400}>
                {CARBON_TOKEN_UNIT}
              </Typography>
            </Stack>
          </TokenCard>
        )}
      </Stack>
      {isDetoken ? (
        <ButtonStack>
          <TokenContentButton
            text={<Trans>Cancel request</Trans>}
            onClick={handleCancelDetoken}
            variant="outlined"
          />
          <TokenContentButton
            text={<Trans>Download request file</Trans>}
            onClick={handleDownloadRequest}
          />
          <Stack
            direction="row"
            spacing={1}
            sx={{
              color: theme.palette.text.secondary,
              flex: 1,
            }}
          >
            <InfoOutlinedIcon sx={{ width: '15px' }} />
            <Typography variant="caption">
              <Trans>
                Do not include the registry-selected passphrase in the file.
              </Trans>
            </Typography>
          </Stack>
        </ButtonStack>
      ) : (
        <ButtonStack>
          <TokenContentButton text={<Trans>Send</Trans>} onClick={handleSend} />
          <TokenContentButton
            text={<Trans>Retire</Trans>}
            onClick={handleRetire}
          />
          {tailData && (
            <TokenContentButton
              text={<Trans>Request Detokenization</Trans>}
              onClick={handleDetoken}
            />
          )}
        </ButtonStack>
      )}
    </Stack>
  )
}

export default TokenContent
