import { Trans } from '@lingui/macro'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Button, ButtonProps, useTheme } from '@mui/material'
interface Props extends ButtonProps {}

const TransactionBackButton = (props: Props) => {
  const theme = useTheme()
  return (
    <Button
      sx={{
        mr: 2,
        backgroundColor: 'transparent',
        color: theme.palette.text.primary,
      }}
      startIcon={<ChevronLeftIcon />}
      {...props}
    >
      <Trans>Back</Trans>
    </Button>
  )
}

export default TransactionBackButton
