import logo from '@/assets/img/climate_wallet-green.png'
import { Loading } from '@/components/loading'
import { Trans } from '@lingui/macro'
import {
  Alert,
  AlertTitle,
  Box,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material'
import { PropsWithChildren, ReactNode } from 'react'

const StyledLogoContainer = styled(Box)({
  width: '100px',
  height: '100px',
  marginBottom: '48px',
  '& img': {
    height: '100px',
  },
})

export const LoginAlert = () => {
  return (
    <Alert
      severity="info"
      sx={{
        position: 'absolute',
        px: '14px',
        py: '18px',
        top: '56px',
        width: '400px',
      }}
    >
      <AlertTitle>
        <Trans>Login info</Trans>
      </AlertTitle>
      <Typography variant="body2">
        <Trans>
          Please open your Chia wallet to be logged into your Climate wallet.
        </Trans>
      </Typography>
    </Alert>
  )
}

interface ILayoutLoadingWalletProps {
  loadingDesc: ReactNode
}

const LayoutLoadingWallet = ({
  loadingDesc,
  children: alertComponent,
}: PropsWithChildren<ILayoutLoadingWalletProps>) => {
  const theme = useTheme()

  return (
    <Stack
      color={theme.palette.primary.main}
      direction="column"
      justifyContent="center"
      alignItems="center"
      position="relative"
      sx={{
        height: '100vh',
      }}
    >
      {alertComponent}
      {/* TODO : add logo */}
      <StyledLogoContainer>
        <img src={logo} alt="logo" />
      </StyledLogoContainer>
      <Typography variant="h4">
        <Trans>Climate Wallet</Trans>
      </Typography>
      <Loading loadingDesc={loadingDesc} sx={{ marginTop: '50px' }} />
    </Stack>
  )
}

export default LayoutLoadingWallet
