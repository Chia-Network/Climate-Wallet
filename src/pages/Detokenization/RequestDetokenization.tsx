import {
  TransactionBasicInfo,
  TransactionBody,
  TransactionContent,
  TransactionPrompt,
} from '@/components/transaction'
import { CARBON_TOKEN_UNIT } from '@/constants/unit'
import useGetTransactionInfos from '@/hooks/useGetTransactionInfos'
import { useDetokenzationBlockingList } from '@/hooks/useLoaclStorage'
import { useWallet, useWalletHumanValue, useWalletState } from '@/hooks/wallet'
import { useGetCWAssetByIdQuery } from '@/services/climateWarehouse'
import { BlockingList, RequestInput } from '@/types/DetokenizationType'
import {
  useGetCATAssetIdQuery,
  useGetWalletBalanceQuery,
} from '@chia/api-react'
import { Trans } from '@lingui/macro'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import RequestDetokenizationDialog from './RequestDetokenizationDialog'

const RequestDetokenization = () => {
  const navigate = useNavigate()
  const { walletId } = useParams()
  const { wallet, unit, loading } = useWallet(walletId)
  const { blockingList, setBlockingList } = useDetokenzationBlockingList()

  const [checked, setChecked] = useState<boolean>(false)

  const { register, formState, handleSubmit, reset } = useForm<RequestInput>({
    mode: 'onChange',
  })

  const { data: assetId } = useGetCATAssetIdQuery({ walletId })
  const { data: cwAsset, isLoading: isLoadingAsset } =
    useGetCWAssetByIdQuery(assetId)
  const { data: walletBalance, isLoading: isLoadingWalletBalance } =
    useGetWalletBalanceQuery(
      {
        walletId,
      },
      {
        pollingInterval: 10000,
      }
    )

  const confirmedWalletBalanceValue = useWalletHumanValue(
    wallet,
    walletBalance?.confirmedWalletBalance,
    CARBON_TOKEN_UNIT
  )

  const carbonTokenInfo = useGetTransactionInfos({
    cwAsset,
    balance: confirmedWalletBalanceValue,
  })

  const handleChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  const onSetBlockingList = () => {
    const oldList: BlockingList = blockingList || []

    if (walletId && !oldList.some((item) => item.walletId === walletId)) {
      setBlockingList([...oldList, { walletId: walletId }])
    }
  }

  //TODO: fake finish if finish request detokenzation
  const handleSave = async (data: RequestInput) => {
    alert('request finish!!')
    onSetBlockingList()
    reset()
    navigate(-1)
  }

  return (
    <Box sx={{ overflow: 'auto', pb: 20, height: '100%' }}>
      <form onSubmit={handleSubmit(handleSave)}>
        <TransactionPrompt when={formState.isDirty} />
        <TransactionContent>
          <Stack
            justifyContent={'center'}
            direction={'row'}
            alignItems={'center'}
          >
            <Typography variant="h4" sx={{ m: 2 }} textAlign={'center'}>
              <Trans>Request Detokenization</Trans>
            </Typography>

            <RequestDetokenizationDialog />
          </Stack>
          <TransactionBody>
            <Typography>
              <Trans>Project information</Trans>
            </Typography>
            <Typography gutterBottom color="gray">
              <Trans>Please confirm project details</Trans>
            </Typography>
            <TransactionBasicInfo infos={carbonTokenInfo} />
            <Typography>
              <Trans>Request Detokenization</Trans>
            </Typography>
            <Typography gutterBottom color="gray">
              <Trans>
                Please fill in the details of request detokenization
              </Trans>
            </Typography>

            <Grid sx={{ mt: 1, mb: 5 }} container spacing={2}>
              <Grid xs={6} item>
                <TextField
                  label={<Trans>Quantity</Trans>}
                  fullWidth
                  {...register('amount', {
                    required: true,
                  })}
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
                  label={<Trans>Passphrase</Trans>}
                  fullWidth
                  {...register('passphrase', {
                    required: true,
                  })}
                  required
                />
              </Grid>
            </Grid>

            <Alert severity="info" sx={{ mt: 1, mb: 3 }}>
              <AlertTitle>
                <Trans>Detokenization cannot be undone</Trans>
              </AlertTitle>
              <Trans>
                The detokenization request file is valid from the moment it is
                created until it is successfully canceled or executed.
              </Trans>
            </Alert>

            <Stack alignItems={'flex-start'} direction={'row'}>
              <Checkbox
                checked={checked}
                onChange={handleChangeCheck}
                sx={{ paddingTop: 0 }}
              />
              <Typography>
                <Trans>
                  I have confirmed that the detokenization details are correct
                  and I want to request detokenization.
                </Trans>
              </Typography>
            </Stack>

            <Stack
              direction={'row'}
              justifyContent={'flex-end'}
              sx={{ mt: 1 }}
              spacing={1}
            >
              <Button
                color="primary"
                onClick={() => {
                  navigate(-1)
                }}
              >
                <Trans>Cancel</Trans>
              </Button>

              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={!formState.isValid || !checked}
              >
                <Trans>Save request</Trans>
              </Button>
            </Stack>
          </TransactionBody>
        </TransactionContent>
      </form>
    </Box>
  )
}

export default RequestDetokenization
