import { Card, Stack, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TransactionBody = styled(Card)<{ selected?: boolean }>(
  ({ theme }) => ({
    padding: theme.spacing(3),
    width: '100%',
    minHeight: 'calc( 100vh - 250px )',
  })
)

export const TransactionInfo = styled(Stack)<{ selected?: boolean }>(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(3),
    width: '100%',
    borderRadius: 4,
  })
)

export const TransactionInput = styled(TextField)<{ selected?: boolean }>(
  ({ theme }) => ({
    marginBottom: 5,
    width: '100%',
  })
)

export const TransactionContentWidth = 720
