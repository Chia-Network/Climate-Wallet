import { useWallet, useWalletHumanValue } from '@/hooks/wallet'
import {
  useGetCurrentAddressQuery,
  useGetLoggedInFingerprintQuery,
  useGetNextAddressMutation,
  useGetWalletBalanceQuery,
  useGetWalletConnectionsQuery,
} from '@chia/api-react'
import { Flex, StateColor, StateIndicatorDot } from '@chia/core'
import { Trans } from '@lingui/macro'
import { Help as HelpIcon } from '@mui/icons-material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import LanguageIcon from '@mui/icons-material/Language'
import {
  alpha,
  Button,
  ButtonProps,
  Dialog,
  Stack,
  Tooltip,
  Typography,
  TypographyProps,
} from '@mui/material'
import { SxProps, Theme, useTheme } from '@mui/material/styles'
import { spacing } from '@mui/system'
import React, { PropsWithChildren, useMemo } from 'react'
import { toast } from 'react-toastify'
import { useCopyToClipboard } from 'react-use'

const chiaWalletId: number = 1

const borderStyle: SxProps<Theme> = {
  // TODO : add this border color to the theme ?
  border: '1px solid #E0E0E0',
  borderRadius: '8px',
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
  const [anchorElW, setAnchorElW] = React.useState<HTMLButtonElement | null>(
    null
  )

  // style
  const theme = useTheme()

  const colorW =
    connectionsW?.length >= 1
      ? StateColor.SUCCESS
      : theme.palette.text.secondary

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      flex={1}
    >
      <Typography color="textSecondary" variant="body2">
        {fingerprint ?? ''}
      </Typography>
      <Stack direction="row" spacing={1}>
        <Stack direction="row" sx={borderStyle}>
          {/* spendable balance value */}
          <Stack direction="row" spacing={1} alignItems="center" px={2}>
            <BoldTypography>{spendableBalanceValue}</BoldTypography>
            <Tooltip
              title={<Trans>This is your spendable balance</Trans>}
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
              borderRadius: '7px',
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
              <ContentCopyIcon sx={iconStyle} />
            </Stack>
          </Button>
          {/* new address dialog */}
          <Dialog open={openView} onClose={handleCloseView}>
            <Stack sx={{ p: 3 }} spacing={2}>
              <Typography sx={{ textAlign: 'center', mt: 3 }} variant="h5">
                <Trans>Address</Trans>
              </Typography>
              <Typography
                sx={{
                  textAlign: 'center',
                  wordBreak: 'break-all',
                  py: 2,
                  px: 3,
                  backgroundColor: '#EBF5EB',
                }}
                variant="body1"
              >
                {address ?? ''}
              </Typography>

              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                  width: '100%',
                }}
              >
                <Button onClick={handleNewAddress} variant="outlined">
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
        <BorderButton
          sx={{
            width: '36px',
            height: '36px',
            minWidth: 'unset',
            color: 'black', // TODO : use theme color like icon color
          }}
        >
          <LanguageIcon />
        </BorderButton>
        {/* synced */}
        <BorderButton sx={{ minWidth: 105, textTransform: 'uppercase' }}>
          <Stack direction="row" gap={1} alignItems="center">
            <Stack>
              <StateIndicatorDot color={colorW} />
            </Stack>
            <Stack color="black">
              {connectionsW?.length >= 3 ? (
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
