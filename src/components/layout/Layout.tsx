import logo from '@/assets/img/climate_wallet-green.png'
import { Loading } from '@chia/core'
import { Trans } from '@lingui/macro'
import { Box, Grid, styled, Typography, useTheme } from '@mui/material'
import { FC, ReactNode, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

interface Props {
  children?: ReactNode
  outlet?: boolean
  actions?: ReactNode
}

const StyledLogoContainer = styled(Box)({
  width: '30px',
  height: '30px',
  '& img': {
    height: '30px',
  },
})

const Layout: FC<Props> = ({ children, outlet, actions }) => {
  const theme = useTheme()

  return (
    <Grid sx={{ height: '100%', overflow: 'hidden' }}>
      <Suspense fallback={<Loading center />}>
        <Grid
          sx={{
            backgroundColor: '#FFFFFF',
            boxShadow: 'inset 0px -1px 0px rgba(0, 0, 0, 0.25)',
            px: 2,
          }}
        >
          <Grid
            container
            flexDirection={'row'}
            alignItems={'center'}
            spacing={2}
            sx={{ paddingX: 3, paddingY: 1.5 }}
          >
            <Grid item>
              <StyledLogoContainer>
                <img src={logo} alt="logo" />
              </StyledLogoContainer>
            </Grid>
            <Grid item>
              <Typography variant="h5" color="secondary" fontWeight="500">
                <Trans>Climate Wallet</Trans>
              </Typography>
            </Grid>
            <Grid flex={1} item>
              <Grid container alignItems={'center'}>
                {actions}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Suspense fallback={<Loading center />}>
          {outlet ? <Outlet /> : children}
        </Suspense>
      </Suspense>
    </Grid>
  )
}

export default Layout
