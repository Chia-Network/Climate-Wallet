import LanguageSelect from '@/components/common/LanguageSelect'
import { useWallet, useWalletHumanValue } from '@/hooks/wallet'
import {
  useGetCurrentAddressQuery,
  useGetLoggedInFingerprintQuery,
  useGetNextAddressMutation,
  useGetWalletBalanceQuery,
  useGetWalletConnectionsQuery,
} from '@chia/api-react'
import { StateColor, StateIndicatorDot } from '@chia/core'
import { Trans } from '@lingui/macro'
import { Help as HelpIcon } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import {
  alpha,
  Button,
  ButtonProps,
  Dialog,
  IconButton,
  Stack,
  SxProps,
  Theme,
  Tooltip,
  Typography,
  TypographyProps,
  useTheme,
} from '@mui/material'
import React, { PropsWithChildren, useMemo } from 'react'
import { toast } from 'react-toastify'
import { useCopyToClipboard } from 'react-use'

const chiaWalletId: number = 1

const borderStyle: SxProps<Theme> = {
  border: '1px solid #E0E0E0',
  borderRadius: '4px',
}

const iconStyle: SxProps<Theme> = {
  width: '20px',
  height: '20px',
}

const BorderButton = ({
  children,
  sx,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <Button
      variant="outlined"
      size="small"
      sx={{ ...borderStyle, ...sx }}
      {...props}
    >
      {children}
    </Button>
  )
}

const BoldTypography = ({
  children,
  ...props
}: PropsWithChildren<TypographyProps>) => (
  <Typography variant="body2" color="textPrimary" fontWeight="500" {...props}>
    {children}
  </Typography>
)

export default function AppStatusHeader() {
  // address
  const { data: address } = useGetCurrentAddressQuery({
    walletId: chiaWalletId, // always show chia wallet's address
  })

  const shortAddress = useMemo<string>(() => {
    if (!address) {
      return ''
    }

    const head = address.slice(0, 5)
    const tail = address.slice(-5)

    return `${head}.....${tail}`
  }, [address])

  // fingerprint
  const { data: fingerprint } = useGetLoggedInFingerprintQuery()

  // view
  const [openView, setOpenView] = React.useState(false)
  const [newAddress] = useGetNextAddressMutation()

  const handleClickOpenView = () => {
    setOpenView(true)
  }

  const handleCloseView = () => {
    setOpenView(false)
  }

  async function handleNewAddress() {
    await newAddress({
      walletId: 1,
      newAddress: true,
    }).unwrap()
  }

  // copy
  const [, copyToClipboard] = useCopyToClipboard()

  function handleCopy(event) {
    event.preventDefault()
    event.stopPropagation()

    copyToClipboard(address ?? '')
    toast('Copied')
  }

  // XCH
  const { data: walletBalance } = useGetWalletBalanceQuery(
    { walletId: chiaWalletId },
    { pollingInterval: 10000 }
  )

  const { wallet, unit = '', loading } = useWallet(chiaWalletId)
  const spendableBalanceValue = useWalletHumanValue(
    wallet,
    walletBalance?.spendableBalance,
    unit
  )

  // wallet
  const { data: connectionsW } = useGetWalletConnectionsQuery(
    {},
    { pollingInterval: 10000 }
  )

  // style
  const theme = useTheme()

  const isSyncingDone = connectionsW?.length >= 3

  const colorW = isSyncingDone ? StateColor.SUCCESS : '#F37C22'

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-end"
      flex={1}
    >
      <Typography color="textSecondary" variant="body2" sx={{ mb: '5px' }}>
        {fingerprint ?? ''}
      </Typography>
      <Stack direction="row" spacing={1}>
        <Stack direction="row" sx={borderStyle}>
          {/* spendable balance value */}
          <Stack direction="row" spacing={1} alignItems="center" px={2}>
            <BoldTypography>{spendableBalanceValue}</BoldTypography>
            <Tooltip
              title={
                <Trans>
                  This is your balance available to pay blockchain fees.
                </Trans>
              }
              arrow
            >
              <HelpIcon
                color="disabled"
                sx={{ color: '#6B6B6B', ...iconStyle }}
              />
            </Tooltip>
          </Stack>
          {/* short address */}
          <Button
            variant="text"
            sx={{
              textTransform: 'none',
              paddingX: 2,
              borderRadius: '3px',
              fontWeight: '500',
              backgroundColor: theme.palette['other'].lightBackground,
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: alpha(theme.palette.secondary.main, 0.4),
              },
            }}
            onClick={handleClickOpenView}
          >
            <Stack direction="row" spacing={1}>
              <BoldTypography>{shortAddress}</BoldTypography>
              <MoreHorizIcon
                sx={{
                  ...iconStyle,
                  color: theme.palette['other'].buttonTextGreen,
                }}
              />
            </Stack>
          </Button>
          {/* new address dialog */}
          <Dialog open={openView} onClose={handleCloseView}>
            <Stack sx={{ px: '24px', py: '16px' }} spacing={'24px'}>
              <IconButton
                aria-label="close"
                onClick={handleCloseView}
                sx={{
                  position: 'absolute',
                  right: 15,
                  top: 8,
                  color: theme.palette.text.primary,
                }}
              >
                <CloseIcon />
              </IconButton>
              <Typography
                sx={{ textAlign: 'center', mt: 3 }}
                variant="h6"
                fontWeight={500}
              >
                <Trans>Address</Trans>
              </Typography>
              <Typography
                sx={{
                  textAlign: 'center',
                  wordBreak: 'break-all',
                  py: '30px',
                  px: 3,
                  backgroundColor: '#EDF6F1',
                }}
                variant="body2"
                fontWeight={500}
              >
                {address ?? ''}
              </Typography>

              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                  width: '100%',
                  pt: '16px',
                }}
              >
                <Button
                  onClick={handleNewAddress}
                  variant="outlined"
                  sx={{
                    textTransform: 'uppercase',
                  }}
                >
                  <Trans>New Address</Trans>
                </Button>
                <Button onClick={handleCopy} variant="contained">
                  <ContentCopyIcon
                    sx={{
                      ...iconStyle,
                      mr: 1,
                    }}
                  />
                  <Trans>Copy</Trans>
                </Button>
              </Stack>
            </Stack>
          </Dialog>
        </Stack>
        {/* language */}
        <LanguageSelect />
        {/* synced */}
        <BorderButton sx={{ minWidth: 105, textTransform: 'uppercase' }}>
          <Stack direction="row" gap={1} alignItems="center">
            <Stack>
              <StateIndicatorDot color={colorW} />
            </Stack>
            <Stack color="black">
              {isSyncingDone ? (
                <Trans>Synced</Trans>
              ) : (
                <Trans>Not Synced</Trans>
              )}
            </Stack>
          </Stack>
        </BorderButton>
      </Stack>
    </Stack>
  )
}
