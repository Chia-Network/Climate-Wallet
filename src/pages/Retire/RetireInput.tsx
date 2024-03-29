import {
  TransactionCATInput,
  TransactionFeeInput,
} from '@/components/transaction'
import { TOKEN_AMOUNT_REGEX } from '@/constants/regex'
import { CARBON_TOKEN_UNIT } from '@/constants/unit'
import { useGetRetireKeysMutation } from '@/services/climateService'
import { InputType } from '@/types/RetireType'
import { Trans } from '@lingui/macro'
import { Help as HelpIcon } from '@mui/icons-material'
import {
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import { useFormContext } from 'react-hook-form'

const RetireInput = () => {
  const [getRetireKeys] = useGetRetireKeysMutation()

  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<InputType>()

  const handleGetRetireKeys = async () => {
    try {
      const retireKey = await getRetireKeys('').unwrap()
      if (retireKey?.bech32m) {
        setValue('publicKey', retireKey?.bech32m, {
          shouldValidate: true,
        })
      } else {
        alert('Can not get my public key')
      }
    } catch (error) {
      alert('Climate service error')
    }
  }

  const theme = useTheme()

  return (
    <Grid sx={{ mt: 1, mb: 5 }} container spacing={2}>
      <Grid xs={6} item>
        <TransactionCATInput />
      </Grid>
      <Grid xs={6} item>
        <TransactionFeeInput />
      </Grid>
      <Grid xs={12} item>
        <TextField
          label={<Trans>Beneficiary Name</Trans>}
          fullWidth
          {...register('beneficiary', {})}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  title={
                    <Trans>
                      Text entered here will be visible on the blockchain. This
                      is an optional field.
                    </Trans>
                  }
                  arrow
                >
                  <HelpIcon
                    color="disabled"
                    sx={{
                      color: theme.palette.text.secondary,
                      width: '24px',
                      height: '24px',
                      mr: 1,
                    }}
                  />
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid xs={12} item>
        <Stack direction={'row'}>
          <TextField
            label={<Trans>Beneficiary Public Key</Trans>}
            fullWidth
            {...register('publicKey', { required: true })}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={
                      <Trans>
                        Public key of the beneficiary to be recorded on the
                        blockchain. Can be used by the beneficiary to prove
                        claimed retirements for auditing purposes.
                      </Trans>
                    }
                    arrow
                  >
                    <HelpIcon
                      color="disabled"
                      sx={{
                        color: theme.palette.text.secondary,
                        width: '24px',
                        height: '24px',
                        mr: 1,
                      }}
                    />
                  </Tooltip>
                  <Button
                    variant="contained"
                    sx={{
                      px: '20px',
                    }}
                    onClick={handleGetRetireKeys}
                  >
                    <Typography variant="body1">
                      <Trans>My Public Key</Trans>
                    </Typography>
                  </Button>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: Boolean(getValues().publicKey),
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  )
}

export default RetireInput
