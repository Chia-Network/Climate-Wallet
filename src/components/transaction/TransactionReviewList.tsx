import type { TransactionInfosType } from '@/types/TransactionType'
import { Box, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
interface Props {
  infos: TransactionInfosType
}

const TransactionReviewList = ({ infos }: Props) => {
  const theme = useTheme()

  return (
    <Box sx={{ mt: 1, mb: 3 }}>
      {infos.map((item, index) => (
        <Stack
          key={index}
          sx={{
            py: '12px',
            borderBottomColor: theme.palette.grey[300],
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
          }}
          spacing={0}
          direction="row"
        >
          <Typography color="textSecondary" variant="body2" sx={{ width: 168 }}>
            {item.subtitle}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={500}
            sx={{ overflowWrap: 'anywhere', flex: 1 }}
          >
            {item.value}
          </Typography>
        </Stack>
      ))}
    </Box>
  )
}

export default TransactionReviewList
