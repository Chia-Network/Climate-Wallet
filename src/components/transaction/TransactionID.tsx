import { Trans } from '@lingui/macro'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Grid, IconButton, Stack, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { useCopyToClipboard } from 'react-use'
import { TransactionInfo } from './TransactionStyle'
interface Props {
  transactionId: string
}

const TransactionID = ({ transactionId }: Props) => {
  const [, copyToClipboard] = useCopyToClipboard()
  return (
    <TransactionInfo sx={{ mt: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Typography color={'gray'}>
            <Trans> Transaction ID</Trans>
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ wordBreak: 'break-all' }}>
            {transactionId}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            color="primary"
            onClick={() => {
              copyToClipboard(transactionId)
              toast.success('Copied')
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        </Grid>
      </Grid>
    </TransactionInfo>
  )
}

export default TransactionID
