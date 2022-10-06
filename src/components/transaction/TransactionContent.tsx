import { Box, Grid } from '@mui/material'
import { ReactNode } from 'react'
import { TransactionContentWidth } from './TransactionStyle'
interface Props {
  children: ReactNode
}

const TransactionContent = ({ children }: Props) => {
  return (
    <Grid container justifyContent={'center'}>
      <Box
        sx={{
          width: TransactionContentWidth,
          m: 2,
        }}
      >
        {children}
      </Box>
    </Grid>
  )
}

export default TransactionContent
