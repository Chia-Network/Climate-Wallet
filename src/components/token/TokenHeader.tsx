import useOpenExternal from '@/hooks/useOpenExternal'
import { useSelectedWallet } from '@/hooks/wallet'
import { Trans } from '@lingui/macro'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, Button, Skeleton, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'
import TokenCard from './TokenCard'

interface TokenHeaderDescProps {
  title: string
  value: string | ReactNode
}

const TokenHeaderDesc = ({ title, value }: TokenHeaderDescProps) => {
  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="body1" fontWeight={400}>
        {title}
        {' : '}
      </Typography>
      <Typography variant="body1" fontWeight={400} color="textPrimary">
        {value}
      </Typography>
    </Stack>
  )
}

const TokenHeader = () => {
  const { wallet, loading, asset, isLoadingAsset } = useSelectedWallet()

  if (loading || !wallet || isLoadingAsset) {
    return null
  }

  const handleViewDetails = () => {
    // TODO : open climate warehouse web
  }

  const openExternal = useOpenExternal()

  const handleProjectLinkClick = (url: string) => {
    const prefix = url.includes('https://') ? '' : 'https://'
    openExternal(`${prefix}${url}`)
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {isLoadingAsset || !asset ? (
          <Skeleton />
        ) : (
          <Typography variant="h6" fontWeight={500}>
            {asset.projectName}
          </Typography>
        )}
        <Button
          variant="outlined"
          startIcon={<OpenInNewIcon />}
          onClick={handleViewDetails}
          sx={{
            textTransform: 'uppercase',
          }}
        >
          <Trans>View Details</Trans>
        </Button>
      </Stack>
      <TokenCard
        icon={<FormatListBulletedIcon fontSize="small" />}
        title={<Trans>Project Details</Trans>}
      >
        <TokenHeaderDesc
          title="Vintage Year"
          value={asset?.vintageYear.toString() ?? ''}
        />
        <TokenHeaderDesc
          title="Current Registry"
          value={asset?.currentRegistry ?? ''}
        />
        <TokenHeaderDesc
          title="Project Link"
          value={
            asset?.projectLink ? (
              <Box
                onClick={() => {
                  handleProjectLinkClick(asset.projectLink)
                }}
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                {asset.projectLink}
              </Box>
            ) : (
              ''
            )
          }
        />
      </TokenCard>
    </Stack>
  )
}

export default TokenHeader