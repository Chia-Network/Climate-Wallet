import { TOKEN_AMOUNT_REGEX } from '@/constants/regex'
import { CARBON_TOKEN_UNIT } from '@/constants/unit'
import { useWallet } from '@/hooks/wallet'
import { InputType, SendStep } from '@/types/SendType'
import { Trans } from '@lingui/macro'
import { Grid, InputAdornment, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useParams } from 'react-router-dom'
const SendInput = () => {
  const { walletId } = useParams()
  const { unit } = useWallet(1)
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
        <TextField
          label={<Trans>Quantity</Trans>}
          fullWidth
          {...register('amount', {
            required: true,
            pattern: TOKEN_AMOUNT_REGEX,
          })}
          error={Boolean(errors['amount'])}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {CARBON_TOKEN_UNIT}
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid xs={6} item>
        <TextField
          label={<Trans>Fee</Trans>}
          fullWidth
          {...register('fee', { required: true })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{unit}</InputAdornment>
            ),
          }}
          required
        />
      </Grid>
      <Grid xs={12} item>
        <TextField
          label={<Trans>memo</Trans>}
          fullWidth
          {...register('memo')}
        />
      </Grid>
    </Grid>
  )
}

SendInput.propTypes = {}

export default SendInput
