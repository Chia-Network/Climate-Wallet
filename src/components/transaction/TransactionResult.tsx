import { Trans } from '@lingui/macro'
import { Button, Divider, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'
import TransactionID from './TransactionID'
import { TransactionBody } from './TransactionStyle'
interface Props {
  children?: ReactNode
  transactionId: string
  onFinish: () => void
}

const TransactionResult = ({ transactionId, children, onFinish }: Props) => {
  return (
    <Stack>
      <Typography variant="h4" sx={{ m: 2 }} textAlign={'center'}>
        <Trans>Transaction result</Trans>
      </Typography>
      <TransactionBody>
        <Typography gutterBottom variant={'body1'}>
          <Trans>Transaction Completed</Trans>
        </Typography>
        <Typography gutterBottom color={'gray'} variant={'body1'}>
          <Trans>
            This transaction has been submitted to the blockchain with this
            transaction ID. It should be confirmed within a few minutes. Until
            then, it will appear in your transaction history as ‘Pending’.
          </Trans>
        </Typography>
        <TransactionID transactionId={transactionId} />
        <Stack sx={{ mb: 3, mt: 3 }} alignItems={'center'}>
          <Button
            color="primary"
            variant="contained"
            onClick={onFinish}
            size="large"
          >
            <Trans>Finish</Trans>
          </Button>
        </Stack>

        <Divider sx={{ mb: 3, mt: 3 }} />
        <Typography gutterBottom variant={'body1'}>
          <Trans>Transaction information</Trans>
        </Typography>
        {children}
      </TransactionBody>
    </Stack>
  )
}

export default TransactionResult
