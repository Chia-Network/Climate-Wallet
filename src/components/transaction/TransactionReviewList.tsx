import type { TransactionInfosType } from '@/types/TransactionType'
import { Trans } from '@lingui/macro'
import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ReactNode } from 'react'
interface Props {
  infos: TransactionInfosType
}

const TransactionReviewList = ({ infos }: Props) => {
  const theme = useTheme()

  return (
    <Box sx={{ mt: 1, mb: 3 }}>
      {infos.map((item, index) => (
        <Grid
          container
          key={index}
          sx={{
            mb: 1,
            pb: 1,
            pt: 1,
            borderBottomColor: theme.palette.grey[300],
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
          }}
          spacing={1}
        >
          <Grid item xs={4}>
            <Typography color="gray" component="div" sx={{ width: 200 }}>
              <Trans>{item.subtitle}</Trans>
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography component="div" sx={{ wordBreak: 'break-all' }}>
              {item.value}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Box>
  )
}

export default TransactionReviewList
