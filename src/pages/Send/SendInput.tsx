import {
  TransactionCATInput,
  TransactionFeeInput,
} from '@/components/transaction'
import { TOKEN_AMOUNT_REGEX } from '@/constants/regex'
import { CARBON_TOKEN_UNIT } from '@/constants/unit'
import { InputType } from '@/types/SendType'
import { Trans } from '@lingui/macro'
import {
  Alert,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useFormContext } from 'react-hook-form'

const SendInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<InputType>()

  return (
    <Grid sx={{ mb: 5 }} container spacing={3}>
      <Grid xs={12} item>
        <TextField
          label={<Trans>Destination address</Trans>}
          fullWidth
          {...register('address', {
            required: true,
          })}
          required
        />
      </Grid>
      <Grid xs={6} item>
        <TransactionCATInput />
      </Grid>
      <Grid xs={6} item>
        <TransactionFeeInput />
      </Grid>
      <Grid xs={12} item>
        <TextField
          label={<Trans>memo</Trans>}
          fullWidth
          {...register('memo')}
        />
        <Alert severity="error">
          <Trans>
            Text input into the ‘Memo’ field will be visible on the blockchain.
          </Trans>
        </Alert>
      </Grid>
    </Grid>
  )
}

SendInput.propTypes = {}

export default SendInput
