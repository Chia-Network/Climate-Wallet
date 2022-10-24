import { Loading } from '@/components/loading'
import { ExportButton, TokenListItem } from '@/components/token'
import { useGetAllCWAssets } from '@/hooks/useGetAllCWAssets'
import { useDetokenzationBlockingList } from '@/hooks/useLoaclStorage'
import {
  useCWAddStrayCats,
  useSelectedWallet,
  useWalletsList,
} from '@/hooks/wallet'
import { useGetAllCWAssetsQuery } from '@/services/climateWarehouse'
import { WalletType } from '@chia/api'
import { Trans } from '@lingui/macro'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

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
  const { isLoadingAddStrayCats } = useCWAddStrayCats()
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

  const isLoading =
    isLoadingWallets || isLoadingAllCWAssets || isLoadingAddStrayCats

  const filteredWallet = useMemo(() => {
    if (!wallets || !allCWAssets) {
      return []
    }
    return wallets.filter((wallet) =>
      allCWAssets.some(
        (asset) => asset.marketplaceIdentifier === wallet.assetId
      )
    )
  }, [wallets, allCWAssets])

  useEffect(() => {
    if (!walletId && filteredWallet.length > 0) {
      setWalletId(filteredWallet[0].walletId)
    }
  }, [filteredWallet])

  useEffect(() => {
    // TODO
    switch (tokenSort) {
      default:
      case TokeSortEnum.QuentyHL:
        break
      case TokeSortEnum.QuentyLH:
        break
      case TokeSortEnum.NameAZ:
        break
      case TokeSortEnum.NameZA:
        break
    }
  }, [tokenSort])

  const allCWAssetsCSVData = useMemo(() => {
    if (!allCWAssets) return []
    return allCWAssets.map((asset) => {
      // TODO : check data
      return {
        Registry: asset.currentRegistry,
        'Project Name': asset.projectName,
        'Project ID': asset.projectId,
        'Vintage Year': asset.vintageYear,
        'Project Link': asset.projectLink,
        'CW Link': '',
      }
    })
  }, [allCWAssets])

  return (
    <StyledRoot direction="column" gap={3}>
      <Stack direction="column" spacing={3}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">
            <Trans>My Wallet</Trans>
          </Typography>
          <ExportButton fileName="token.csv" data={allCWAssetsCSVData} />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2">
            <Trans>Sort by</Trans>
          </Typography>
          <FormControl sx={{ flex: 1 }}>
            <InputLabel id="demo-simple-select-label">
              <Trans>Label</Trans>
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tokenSort}
              label={<Trans>Label</Trans>}
              onChange={(event) => {
                setTokenSort(event.target.value as TokeSortEnum)
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
      </Stack>
      <Stack spacing={1} direction="column">
        {isLoading ? (
          <Loading center />
        ) : filteredWallet.length > 0 ? (
          filteredWallet.map((wallet) => {
            const { walletId, assetId } = wallet

            return (
              <TokenListItem
                key={assetId ?? walletId}
                walletId={Number(walletId)}
                isDetoken={isDetokenWallet(walletId)}
              />
            )
          })
        ) : (
          <Typography>No projects.</Typography>
        )}
      </Stack>
    </StyledRoot>
  )
}
