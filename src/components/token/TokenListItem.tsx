import {
  useSelectedWallet,
  useWallet,
  useWalletHumanValue,
} from '@/hooks/wallet'
import { useGetCWAssetByIdQuery } from '@/services/climateWarehouse'
import {
  useGetCATAssetIdQuery,
  useGetWalletBalanceQuery,
} from '@chia/api-react'
import { Trans } from '@lingui/macro'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Skeleton,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material'

interface StyledButtonProps {
  selected?: boolean
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<StyledButtonProps>(({ theme, selected }) => ({
  border: `${selected ? '2px' : '1px'} solid ${
    selected
      ? theme.palette['other'].buttonContainer
      : theme.palette.text.primary
  }`,
  backgroundColor: 'transparent',
  borderRadius: '8px',
  padding: '12px',
  width: '100%',
  height: '100%',
  p: 0,
  textAlign: 'left',
}))

const StyledSkeleton = styled(Skeleton)({
  width: '270px',
  height: '30px',
})

export interface TokenListItemProps {
  walletId: number
  isDetoken: boolean
}

const TokenListItem = ({ walletId, isDetoken }: TokenListItemProps) => {
  const theme = useTheme()

  const { walletId: selectedWalletId, setWalletId } = useSelectedWallet()
  const { data: assetId } = useGetCATAssetIdQuery({ walletId: walletId })
  const {
    data: asset,
    isLoading: isLoadingAsset,
    error: errorAsset,
  } = useGetCWAssetByIdQuery(assetId ?? '')
  const { data: walletBalance } = useGetWalletBalanceQuery(
    { walletId },
    { pollingInterval: 10000 }
  )
  const { wallet, unit = '' } = useWallet(walletId)
  const isSelected = walletId === Number(selectedWalletId)

  const confirmedWalletBalanceValue = useWalletHumanValue(
    wallet,
    walletBalance?.confirmedWalletBalance,
    unit
  )

  const handleSelectItem = () => {
    setWalletId(walletId)
  }

  const selectedColor = isSelected
    ? theme.palette['other'].buttonTextGreen
    : theme.palette.text.primary

  return (
    <StyledButton selected={isSelected} onClick={handleSelectItem}>
      <Stack
        sx={{
          // TODO : use theme color
          color: 'black',
          width: '100%',
          textTransform: 'none',
        }}
        spacing={1}
      >
        {isDetoken && (
          <Box
            sx={{
              backgroundColor: theme.palette['other'].lightBadgeRequesting,
              color: theme.palette.common.white,
              borderRadius: '30px',
              px: 2,
              maxWidth: 'fit-content',
            }}
          >
            <Trans>Requesting Detokenization</Trans>
          </Box>
        )}
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            variant="h6"
            sx={{
              color: selectedColor,
              textAlign: 'bottom',
            }}
          >
            {confirmedWalletBalanceValue}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.secondary, textAlign: 'bottom' }}
          >
            tCO2e
          </Typography>
        </Stack>
        {isLoadingAsset ? (
          <Stack spacing="inherit">
            <StyledSkeleton />
            <StyledSkeleton />
            <Divider />
            <StyledSkeleton />
          </Stack>
        ) : errorAsset ? (
          <>ERROR</>
        ) : (
          asset && (
            <Stack spacing="inherit">
              <Typography
                variant="body1"
                sx={{
                  lineHeight: '24px',
                  paddingBottom: '8px',
                  color: selectedColor,
                }}
              >
                {asset.projectName}
              </Typography>
              <Stack direction="row" alignItems="flex-end">
                <Typography variant="caption">
                  <Trans>Vintage Year</Trans>
                </Typography>
                &nbsp;
                <Typography variant="body2">{asset.vintageYear}</Typography>
              </Stack>
              <Divider />
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  mt: '6px',
                }}
              >
                <Avatar
                  alt={assetId ?? 'token icon'}
                  src={asset.registryLogo}
                  variant="rounded"
                  sx={{
                    width: '32px',
                    height: '32px',
                  }}
                />
                <Typography variant="caption">
                  {asset.currentRegistry}
                </Typography>
              </Stack>
            </Stack>
          )
        )}
      </Stack>
    </StyledButton>
  )
}

export default TokenListItem
