import {
  TransactionBasicInfo,
  TransactionBody,
  TransactionContent,
  TransactionReviewList,
  TransactionStep,
} from '@/components/transaction'
import TabPanel from '@/components/UIKit/TabPanel'
import { CARBON_TOKEN_UNIT } from '@/constants/unit'
import useGetTransactionInfos from '@/hooks/useGetTransactionInfos'
import { useDetokenzationBlockingList } from '@/hooks/useLoaclStorage'
import { useWallet, useWalletHumanValue, useWalletState } from '@/hooks/wallet'
import { useGetCWAssetByIdQuery } from '@/services/climateWarehouse'
import {
  BlockingList,
  CancelInput,
  CancelStep,
} from '@/types/DetokenizationType'
import {
  useGetCATAssetIdQuery,
  useGetWalletBalanceQuery,
} from '@chia/api-react'
import { Trans } from '@lingui/macro'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { ChangeEvent, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const CancelDetokenization = () => {
  const navigate = useNavigate()
  const { walletId } = useParams()
  const { unit } = useWallet(1)
  const { wallet } = useWallet(walletId)
  const { blockingList, setBlockingList } = useDetokenzationBlockingList()

  const [step, setStep] = useState<CancelStep>(CancelStep.Input)
  const [checked, setChecked] = useState<boolean>(false)
  const [openResult, setOpenResult] = useState<boolean>(false)

  const { handleSubmit, formState, register, getValues } = useForm<CancelInput>(
    {
      defaultValues: {
        fee: '0.001 ',
      },
      mode: 'onChange',
    }
  )

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

  const reviewInfo = [
    ...carbonTokenInfo,
    {
      //TODO: Add real detokenzation quantity
      subtitle: <Trans>Detokenization Quantity</Trans>,
      value: '400.000 tCO2e',
    },
  ]

  const handleChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const onRemoveBlockingList = () => {
    const oldList: BlockingList = blockingList || []
    setBlockingList(oldList.filter((item) => item.walletId !== walletId))
  }
  //TODO: Confirm cancel detokenzation
  const handleConfirm = (data: CancelInput) => {
    onRemoveBlockingList()
    setStep(CancelStep.Result)
  }

  return (
    <Box sx={{ overflow: 'auto', pb: 20, height: '100%' }}>
      <Grid container sx={{ mt: 2 }} justifyContent={'center'}>
        <Grid item sx={{ width: 800 }}>
          <TransactionStep
            steps={[
              {
                subtitle: <Trans>Confirm transaction details</Trans>,
              },
              {
                subtitle: <Trans>Transaction result</Trans>,
              },
            ]}
            selected={step}
          />
        </Grid>
      </Grid>

      <TransactionContent>
        <TabPanel value={step} index={CancelStep.Input}>
          <Typography variant="h4" sx={{ m: 2 }} textAlign={'center'}>
            <Trans>Cancel</Trans>
          </Typography>
          <TransactionBody>
            <Typography gutterBottom>
              <Trans>Information of request detokenization</Trans>
            </Typography>
            <Typography gutterBottom color={'gray'} marginBottom={2}>
              <Trans>Please confirm your request detokenization details.</Trans>
            </Typography>

            <form onSubmit={handleSubmit(handleConfirm)}>
              <TransactionBasicInfo infos={reviewInfo} />

              <TextField
                label={<Trans>fee</Trans>}
                fullWidth
                {...register('fee', {
                  required: true,
                })}
                required
                sx={{ mt: 3, mb: 3 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">{unit} Free</InputAdornment>
                  ),
                }}
              />
              <Alert severity="info">
                <AlertTitle>
                  <Trans>Irrevocable once submitted</Trans>
                </AlertTitle>
                <Trans>
                  This action is irreversible once submitted, please ensure the
                  details here are correct.
                </Trans>
              </Alert>
              <Stack sx={{ m: 1, mb: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={handleChangeCheck} />
                  }
                  label="Yes, I want to cancel the detokenization requirement."
                />
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
                  endIcon={<ChevronRightIcon />}
                >
                  <Trans>Confirm</Trans>
                </Button>
              </Stack>
            </form>
          </TransactionBody>
        </TabPanel>
        <TabPanel value={step} index={CancelStep.Result}>
          <Typography variant="h4" sx={{ m: 2 }} textAlign={'center'}>
            <Trans>Result</Trans>
          </Typography>
          <TransactionBody>
            <Typography gutterBottom>
              <Trans>Transaction completed</Trans>
            </Typography>
            <Typography gutterBottom color={'gray'} marginBottom={2}>
              <Trans>
                You have completed the transaction, this is your transaction ID,
                you can go to space scan to check the transaction history.
              </Trans>
            </Typography>

            <Stack sx={{ mt: 1 }} alignItems={'center'}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => navigate(-1)}
                size="large"
              >
                <Trans>Finish</Trans>
              </Button>
            </Stack>
            <Divider sx={{ mb: 3, mt: 3 }} />
            <Typography gutterBottom>
              <Trans>Transaction information</Trans>
            </Typography>
            <Typography gutterBottom color={'gray'} marginBottom={3}>
              <Trans>This is your transaction information.</Trans>
            </Typography>

            <TransactionReviewList
              infos={[
                ...reviewInfo,
                {
                  subtitle: <Trans>Transaction fee</Trans>,
                  value: `${getValues().fee} ${unit}`,
                },
              ]}
            />
          </TransactionBody>
        </TabPanel>
      </TransactionContent>
    </Box>
  )
}

export default CancelDetokenization
