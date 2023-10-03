import { useMemo } from 'react'
import { XCH_FEE_REGEX } from '@/constants/regex'
import { useWallet, useWalletsBalance, useWalletsList } from '@/hooks/wallet'
import { InputType } from '@/types/SendType'
import { Trans } from '@lingui/macro'
import { InputAdornment, TextField, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { WalletType } from '@chia/api'
import { MOJO_PER_CHIA } from '@/constants/chia'

const TransactionFeeInput = () => {
  const { unit } = useWallet(1)

  const { list: wallets, isLoading: isLoadingWallets } = useWalletsList(
    [WalletType.STANDARD_WALLET],
    ''
  )

  const { isLoading: isLoadingWalletsBalance, data: walletsBalance } =
    useWalletsBalance(wallets || [])

  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<Pick<InputType, 'fee'>>()

  const max = useMemo(() => {
    const mojoBalance = walletsBalance?.[0] || 0

    if (!mojoBalance || isNaN(mojoBalance)) {
      return 0
    }

    return mojoBalance / MOJO_PER_CHIA
  }, [walletsBalance])

  if (isLoadingWallets || isLoadingWalletsBalance) {
    return null
  }

  return (
    <TextField
      label={<Trans>Fee</Trans>}
      fullWidth
      {...register('fee', { required: true, pattern: XCH_FEE_REGEX, max })}
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
      helperText={
        Boolean(errors['fee']) &&
        (Number(getValues('fee')) > max ? (
          <Trans>
            Amount entered is higher than the amount you currently hold. Please
            lower the amount so that it is below the number displayed in your
            wallet.
          </Trans>
        ) : (
          <Trans>Amount input format is error.</Trans>
        ))
      }
      required
    />
  )
}

export default TransactionFeeInput
