import { Loading } from '@/components/loading'
import { ExportButton, TokenListItem } from '@/components/token'
import { useGetAllCWAssets } from '@/hooks/useGetAllCWAssets'
import { useDetokenzationBlockingList } from '@/hooks/useLoaclStorage'
import {
  useCWAddStrayCats,
  useSelectedWallet,
  useWalletsBalance,
  useWalletsList,
  useWalletState,
} from '@/hooks/wallet'
import SyncingStatus from '@/constants/SyncingStatus'
import getCWLink from '@/util/getCWLink'
import { checkMarketplaceIdentifier } from '@/util/token'
import { WalletType } from '@chia/api'
import { Trans } from '@lingui/macro'
import { useNavigate } from 'react-router-dom'
import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { WalletListItem } from '../../types/WalletType'

enum TokenSortEnum {
  QuantityHightToLow = 0, // Quantity - high to low
  QuantityLowToHigh = 1, // Quantity -  low to high
  NameAToZ = 2, // Name -  A to Z
  NameZToA = 3, // Name -  Z to A
}

const StyledRoot = styled(Stack)(({ theme }) => ({
  width: '360px',
  height: '100%',
  // TODO : check why overflow not work, so it need more padding to active scroll
  padding: '32px 24px 80px 40px',
  borderRight: `1px solid ${theme.palette.divider}`,
  flexGrow: 1,
  overflowY: 'auto',
}))

export default function TokenSidebar() {
  const navigate = useNavigate()
  const { isLoadingAddStrayCats } = useCWAddStrayCats()
  const { state: walletState } = useWalletState()
  const { list: wallets, isLoading: isLoadingWallets } = useWalletsList(
    [WalletType.STANDARD_WALLET, WalletType.CAT],
    ''
  )
  const { walletId, setWalletId } = useSelectedWallet()

  const [tokenSort, setTokenSort] = useState<TokenSortEnum>(
    TokenSortEnum.QuantityHightToLow
  )
  const { isDetokenWallet } = useDetokenzationBlockingList()

  const {
    data: allCWAssets,
    isLoading: isLoadingAllCWAssets,
    error: errorAllCWAssets,
  } = useGetAllCWAssets()

  /**
   * this filters down to just CATS with unit records in CADT (climate warehouse)
   */
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

  const { isLoading: isLoadingWalletsBalance, data: walletsBalance } =
    useWalletsBalance(filteredWallets)

  // TODO : can refactor
  const sortedTokens = useMemo<WalletListItem[]>(() => {
    if (filteredWallets.length !== walletsBalance.length) {
      return [...filteredWallets]
    }

    switch (tokenSort) {
      default:
        return [...filteredWallets]
      case TokenSortEnum.QuantityHightToLow:
        return [...filteredWallets].sort((a, b) => {
          return (
            walletsBalance[filteredWallets.indexOf(b)] -
            walletsBalance[filteredWallets.indexOf(a)]
          )
        })
      case TokenSortEnum.QuantityLowToHigh:
        return [...filteredWallets].sort((a, b) => {
          return (
            walletsBalance[filteredWallets.indexOf(a)] -
            walletsBalance[filteredWallets.indexOf(b)]
          )
        })
      case TokenSortEnum.NameAToZ:
        return [...filteredWallets].sort((a, b) => {
          var aName =
            allCWAssets.find(
              (asset) =>
                checkMarketplaceIdentifier(asset.marketplaceIdentifier) ===
                a.assetId
            )?.projectName ?? ''
          var bName =
            allCWAssets.find(
              (asset) =>
                checkMarketplaceIdentifier(asset.marketplaceIdentifier) ===
                b.assetId
            )?.projectName ?? ''
          return aName.localeCompare(bName)
        })
      case TokenSortEnum.NameZToA:
        return [...filteredWallets].sort((a, b) => {
          var aName =
            allCWAssets.find(
              (asset) =>
                checkMarketplaceIdentifier(asset.marketplaceIdentifier) ===
                a.assetId
            )?.projectName ?? ''
          var bName =
            allCWAssets.find(
              (asset) =>
                checkMarketplaceIdentifier(asset.marketplaceIdentifier) ===
                b.assetId
            )?.projectName ?? ''
          return bName.localeCompare(aName)
        })
    }
  }, [tokenSort, filteredWallets, walletsBalance])

  const allCWAssetsCSVData = useMemo(() => {
    if (!allCWAssets || !filteredWallets) return []

    return filteredWallets.map((wallet) => {
      const asset = allCWAssets.find(
        (a) =>
          checkMarketplaceIdentifier(a.marketplaceIdentifier) === wallet.assetId
      )

      const balanceIndex = filteredWallets.indexOf(wallet)
      const balance = walletsBalance[balanceIndex]
      const safeQuantity = balance !== 0 ? balance / 1000 : 0 // Protect against dividing by zero

      return {
        Registry: asset.currentRegistry,
        Quantity: safeQuantity,
        'Project Name': asset.projectName,
        'Project ID': asset.projectId,
        'Vintage Year': asset.vintageYear,
        'Project Link': asset.projectLink,
        'CADT Link': `${getCWLink()}/#/units?orgUid=${asset.orgUid}&search=${
          asset.marketplaceIdentifier
        }`,
      }
    })
  }, [allCWAssets, filteredWallets, walletsBalance])

  const isLoading =
    isLoadingWallets ||
    isLoadingAllCWAssets ||
    isLoadingAddStrayCats ||
    isLoadingWalletsBalance

  const theme = useTheme()

  useEffect(() => {
    if (
      !walletId &&
      sortedTokens.length > 0 &&
      filteredWallets.length === walletsBalance.length
    ) {
      setWalletId(sortedTokens[0].walletId)
    }
  }, [sortedTokens, filteredWallets, walletsBalance])

  if (
    !isLoading &&
    filteredWallets.length === 0 &&
    walletState === SyncingStatus.SYNCED
  ) {
    navigate('/dashboard/wallets/no-token')
  }

  return (
    <StyledRoot direction="column" gap={3}>
      <Stack direction="column" spacing={3}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">
            <Trans>My Wallet</Trans>
          </Typography>
          {!isLoading && sortedTokens.length > 0 && (
            <ExportButton fileName="token.csv" data={allCWAssetsCSVData} />
          )}
        </Stack>
      </Stack>

      {isLoading ? (
        <div>
          <Loading center />
          {walletState !== SyncingStatus.SYNCED && (
            <center>Your Chia Wallet is still syncing...</center>
          )}
        </div>
      ) : sortedTokens.length > 0 ? (
        <Stack spacing={1} direction="column">
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              color: theme.palette.text.secondary,
              mb: 3,
            }}
          >
            <Typography variant="body2">
              <Trans>Sort by</Trans>
            </Typography>
            <FormControl sx={{ flex: 1 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tokenSort}
                displayEmpty
                onChange={(event) => {
                  setTokenSort(event.target.value as TokenSortEnum)
                }}
                sx={{
                  height: '40px',
                  color: theme.palette.text.secondary,
                }}
              >
                <MenuItem value={TokenSortEnum.QuantityHightToLow}>
                  <Trans>Quantity - high to low</Trans>
                </MenuItem>
                <MenuItem value={TokenSortEnum.QuantityLowToHigh}>
                  <Trans>Quantity - low to high</Trans>
                </MenuItem>
                <MenuItem value={TokenSortEnum.NameAToZ}>
                  <Trans>Project Name - A to Z</Trans>
                </MenuItem>
                <MenuItem value={TokenSortEnum.NameZToA}>
                  <Trans>Project Name - Z to A</Trans>
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
          {sortedTokens.map((wallet) => {
            const { walletId, assetId } = wallet
            return (
              <TokenListItem
                key={assetId ?? walletId}
                walletId={Number(walletId)}
                isDetoken={isDetokenWallet(walletId)}
              />
            )
          })}
        </Stack>
      ) : (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            py: '100px',
          }}
        >
          <Typography variant="body2" color="textSecondary">
            No projects.
          </Typography>
        </Stack>
      )}
    </StyledRoot>
  )
}
