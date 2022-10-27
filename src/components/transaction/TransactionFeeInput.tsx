import { XCH_FEE_REGEX } from '@/constants/regex'
import { useWallet } from '@/hooks/wallet'
import { InputType } from '@/types/SendType'
import { Trans } from '@lingui/macro'
import { InputAdornment, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const TransactionFeeInput = () => {
  const { unit } = useWallet(1)

  const {
    register,
    formState: { errors },
  } = useFormContext<Pick<InputType, 'fee'>>()

  return (
    <TextField
      label={<Trans>Fee</Trans>}
      fullWidth
      {...register('fee', { required: true, pattern: XCH_FEE_REGEX })}
      error={Boolean(errors['fee'])}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Typography
              color="textSecondary"
              variant="body1"
              fontWeight={400}
            >{`${unit} Fee`}</Typography>
          </InputAdornment>
        ),
      }}
      required
    />
  )
}

export default TransactionFeeInput
