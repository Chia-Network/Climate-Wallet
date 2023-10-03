import { useMemo, useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  useCWAddStrayCats,
  useWalletsBalance,
  useWalletsList,
  useWalletState,
} from '@/hooks/wallet'
import { useGetAllCWAssets } from '@/hooks/useGetAllCWAssets'
import SyncingStatus from '@/constants/SyncingStatus'
import { WalletType } from '@chia/api'
import { checkMarketplaceIdentifier } from '@/util/token'
import { WalletListItem } from '../../types/WalletType'

const NoTokensFound = () => {
  const navigate = useNavigate()
  const { state: walletState } = useWalletState()

  const { list: wallets, isLoading: isLoadingWallets } = useWalletsList(
    [WalletType.STANDARD_WALLET, WalletType.CAT],
    ''
  )

  const { isLoadingAddStrayCats } = useCWAddStrayCats()

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
    isLoadingWallets ||
    isLoadingAllCWAssets ||
    isLoadingAddStrayCats ||
    isLoadingWalletsBalance

  useEffect(() => {
    // Since most of the hooks in this repo are "hooks" of "hooks",
    // Its difficult to use the traditional "pollingInterval" method
    // So instead on an interval we are going to redirect to the dashboard
    // where it will do a fresh check for climate tokens and redirect back here
    // if there are none, where the cycle will continue until tokens are detected.
    const interval = setInterval(() => {
      console.log('Checking for Climate Tokens')
      navigate('/dashboard')
    }, 60000)
    return () => clearInterval(interval)
  }, [isLoading, filteredWallets])

  if (
    isLoading &&
    walletState === SyncingStatus.SYNCED &&
    filteredWallets.length !== 0
  ) {
    console.log('Climate Tokens Detected')
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
