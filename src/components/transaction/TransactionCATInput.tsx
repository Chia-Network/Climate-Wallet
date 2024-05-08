import { TOKEN_AMOUNT_REGEX } from '@/constants/regex'
import { CARBON_TOKEN_UNIT } from '@/constants/unit'
import { InputType } from '@/types/SendType'
import { useGetWalletBalanceQuery } from '@chia/api-react'
import { Trans } from '@lingui/macro'
import { InputAdornment, TextField, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useParams } from 'react-router-dom'
const TransactionCATInput = () => {
  const { walletId } = useParams()
  const { data: walletBalance, isLoading: isLoadingWalletBalance } =
    useGetWalletBalanceQuery(
      {
        walletId,
      },
      {
        pollingInterval: 10000,
        skip: !walletId,
      }
    )
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<Pick<InputType, 'amount'>>()

  const max = (walletBalance?.confirmedWalletBalance ?? 1000) / 1000

  if (isLoadingWalletBalance) {
    return null
  }

  return (
    <TextField
      label={<Trans>Quantity</Trans>}
      fullWidth
      {...register('amount', {
        required: true,
        pattern: TOKEN_AMOUNT_REGEX,
        max,
      })}
      error={Boolean(errors['amount'])}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Typography color="textSecondary" variant="body1" fontWeight={400}>
              {CARBON_TOKEN_UNIT}
            </Typography>
          </InputAdornment>
        ),
      }}
      helperText={
        Boolean(errors['amount']) &&
        (Number(getValues('amount')) > max ? (
          <Trans>
            Amount entered is higher than the amount you currently hold. Please
            lower the amount so that it is below the number displayed in your
            wallet.
          </Trans>
        ) : (
          <>
            {!isNaN(parseFloat(getValues('amount'))) &&
            isFinite(Number(getValues('amount'))) &&
            !Number.isInteger(Number(getValues('amount'))) ? (
              <Trans>Only integers are allowed.</Trans>
            ) : (
              <Trans>Amount input format is error.</Trans>
            )}
          </>
        ))
      }
      required
    />
  )
}

export default TransactionCATInput
