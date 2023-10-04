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

enum TokeSortEnum {
  QuentyHL = 0, // Quantity - high to low
  QuentyLH = 1, // Quantity -  low to high
  NameAZ = 2, // Name -  A to Z
  NameZA = 3, // Name -  Z to A
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

  const [tokenSort, setTokenSort] = useState<TokeSortEnum>(
    TokeSortEnum.QuentyHL
  )
  const { isDetokenWallet } = useDetokenzationBlockingList()

  const {
    data: allCWAssets,
    isLoading: isLoadingAllCWAssets,
    error: errorAllCWAssets,
  } = useGetAllCWAssets()

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
  const sortedWallets = useMemo<WalletListItem[]>(() => {
    if (filteredWallets.length !== walletsBalance.length) {
      return [...filteredWallets]
    }

    switch (tokenSort) {
      default:
        return [...filteredWallets]
      case TokeSortEnum.QuentyHL:
        return [...filteredWallets].sort((a, b) => {
          return (
            walletsBalance[filteredWallets.indexOf(b)] -
            walletsBalance[filteredWallets.indexOf(a)]
          )
        })
      case TokeSortEnum.QuentyLH:
        return [...filteredWallets].sort((a, b) => {
          return (
            walletsBalance[filteredWallets.indexOf(a)] -
            walletsBalance[filteredWallets.indexOf(b)]
          )
        })
      case TokeSortEnum.NameAZ:
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
      case TokeSortEnum.NameZA:
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
      sortedWallets.length > 0 &&
      filteredWallets.length === walletsBalance.length
    ) {
      setWalletId(sortedWallets[0].walletId)
    }
  }, [sortedWallets, filteredWallets, walletsBalance])

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
          {!isLoading && sortedWallets.length > 0 && (
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
      ) : sortedWallets.length > 0 ? (
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
                  setTokenSort(event.target.value as TokeSortEnum)
                }}
                sx={{
                  height: '40px',
                  color: theme.palette.text.secondary,
                }}
              >
                <MenuItem value={TokeSortEnum.QuentyHL}>
                  <Trans>Quantity - high to low</Trans>
                </MenuItem>
                <MenuItem value={TokeSortEnum.QuentyLH}>
                  <Trans>Quantity - low to high</Trans>
                </MenuItem>
                <MenuItem value={TokeSortEnum.NameAZ}>
                  <Trans>Name - A to Z</Trans>
                </MenuItem>
                <MenuItem value={TokeSortEnum.NameZA}>
                  <Trans>Name - Z to A</Trans>
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
          {sortedWallets.map((wallet) => {
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
