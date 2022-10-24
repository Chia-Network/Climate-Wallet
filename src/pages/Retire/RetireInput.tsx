import { TOKEN_AMOUNT_REGEX } from '@/constants/regex'
import { CARBON_TOKEN_UNIT } from '@/constants/unit'
import { useWallet } from '@/hooks/wallet'
import { useGetRetireKeysQuery } from '@/services/climateService'
import { InputType } from '@/types/RetireType'
import { Trans } from '@lingui/macro'
import { Button, Grid, InputAdornment, Stack, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useParams } from 'react-router-dom'

const RetireInput = () => {
  const { walletId } = useParams()

  const { data: retireKey } = useGetRetireKeysQuery('')

  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<InputType>()
  const { unit } = useWallet(1)

  return (
    <Grid sx={{ mt: 1, mb: 5 }} container spacing={2}>
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
          label={<Trans>The name of the beneficiary</Trans>}
          fullWidth
          {...register('beneficiary', {})}
        />
      </Grid>
      <Grid xs={12} item>
        <Stack direction={'row'}>
          <TextField
            label={<Trans>The public key of the beneficiary</Trans>}
            fullWidth
            {...register('publicKey', { required: true })}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <Button
            variant="contained"
            onClick={() => {
              if (retireKey?.bech32m) {
                setValue('publicKey', retireKey?.bech32m, {
                  shouldValidate: true,
                })
              }
            }}
            sx={{ width: 240 }}
          >
            Insert a address
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default RetireInput
