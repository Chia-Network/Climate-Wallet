import { Box, Grid } from '@mui/material'

const NoTokensFound = () => {
  return (
    <Box sx={{ overflow: 'auto', pb: 20, height: '100%' }}>
      <Grid container sx={{ mt: 2, height: '100%' }}>
        <Grid item sx={{ flex: 1 }} />
        <Grid
          item
          sx={{
            flex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <div></div>
            <h1>No climate tokens detected</h1>
            <p style={{ fontSize: 11 }}>
              The default Climate Wallet does not support climate tokens minted
              by registries not listed on the CADT observer node{' '}
              <a href="https://observer.climateactiondata.org/">
                https://observer.climateactiondata.org/
              </a>
              . To change the default settings, follow the instructions found on{' '}
              <a href="https://github.com/Chia-Network/climate-wallet">
                https://github.com/Chia-Network/climate-wallet
              </a>
            </p>
          </div>
        </Grid>
        <Grid item sx={{ flex: 1 }} />
      </Grid>
    </Box>
  )
}

export default NoTokensFound
