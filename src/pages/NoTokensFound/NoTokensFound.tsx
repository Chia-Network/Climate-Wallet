import { useMemo } from 'react'
import { Box, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useWalletsBalance, useWalletsList } from '@/hooks/wallet'
import { useGetAllCWAssets } from '@/hooks/useGetAllCWAssets'
import { WalletType } from '@chia/api'
import { checkMarketplaceIdentifier } from '@/util/token'
import { WalletListItem } from '../../types/WalletType'

const NoTokensFound = () => {
  const navigate = useNavigate()

  const { list: wallets, isLoading: isLoadingWallets } = useWalletsList(
    [WalletType.STANDARD_WALLET, WalletType.CAT],
    ''
  )

  const { data: allCWAssets, isLoading: isLoadingAllCWAssets } =
    useGetAllCWAssets()

  const filteredWallets = useMemo<WalletListItem[]>(() => {
    if (!wallets || !allCWAssets) {
      return []
    }
    return wallets.filter(
      (wallet) =>
        allCWAssets.some(
          (asset) =>
            checkMarketplaceIdentifier(asset.marketplaceIdentifier) ===
            wallet.assetId
        ) && wallet.assetId !== undefined
    )
  }, [wallets, allCWAssets])

  const { isLoading: isLoadingWalletsBalance } =
    useWalletsBalance(filteredWallets)

  const isLoading =
    isLoadingWallets || isLoadingAllCWAssets || isLoadingWalletsBalance

  if (isLoading) {
    navigate('/dashboard')
  }

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
