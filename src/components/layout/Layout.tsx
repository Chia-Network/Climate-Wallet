import { Loading } from '@chia/core'
import { Trans } from '@lingui/macro'
import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { FC, ReactNode, Suspense } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
interface Props {
  children?: ReactNode
  outlet?: boolean
  actions?: ReactNode
}

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
              <Box
                sx={{
                  backgroundColor: '#D9D9D9',
                  borderRadius: '4px',
                  width: '40px',
                  height: '40px',
                }}
              />
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
