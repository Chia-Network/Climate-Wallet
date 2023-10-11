import {
  TransactionBackButton,
  TransactionBasicInfo,
  TransactionBody,
  TransactionButton,
  TransactionContent,
  TransactionLoadingButton,
  TransactionPrompt,
  TransactionResult,
  TransactionReviewList,
  TransactionStep,
} from '@/components/transaction'
import TabPanel from '@/components/UIKit/TabPanel'
import { CARBON_TOKEN_UNIT } from '@/constants/unit'
import { useGetAllCWAssetsById } from '@/hooks/useGetAllCWAssets'
import useGetTransactionInfos from '@/hooks/useGetTransactionInfos'
import { useWallet, useWalletHumanValue, useWalletState } from '@/hooks/wallet'
import { InputType, SendStep } from '@/types/SendType'
import transactionValidCheck from '@/util/transactionValidCheck'
import {
  useGetCATAssetIdQuery,
  useGetWalletBalanceQuery,
  useSpendCATMutation,
} from '@chia/api-react'
import { catToMojo, chiaToMojo } from '@chia/core'
import { Trans } from '@lingui/macro'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {
  Alert,
  AlertTitle,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import SendInput from './SendInput'

const Send = () => {
  const navigate = useNavigate()
  const { walletId } = useParams()
  const { wallet, unit, loading } = useWallet(walletId)
  const { state } = useWalletState()

  //TODO:  remove default address and amount
  const methods = useForm<InputType>({
    defaultValues: {
      fee: '0.001',
    },
    mode: 'onChange',
  })

  const { data: assetId } = useGetCATAssetIdQuery(
    { walletId: walletId },
    { skip: !walletId }
  )

  const { data: cwAsset, isLoading: isLoadingAsset } =
    useGetAllCWAssetsById(assetId)

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
      subtitle: <Trans>Destination address</Trans>,
      value: methods.getValues().address,
    },
    {
      subtitle: <Trans>Send Quantity</Trans>,
      value: methods.getValues().amount,
    },
    {
      subtitle: <Trans>Transaction fee</Trans>,
      value: methods.getValues().fee,
    },
    { subtitle: <Trans>Memo</Trans>, value: methods.getValues().memo },
  ]

  const [spendCAT, { isLoading: isSpendCatLoading }] = useSpendCATMutation()

  const [step, setStep] = useState<SendStep>(SendStep.Input)
  const [checked, setChecked] = useState<boolean>(false)
  const [transactionId, setTransactionId] = useState<string>('')

  const handleReview = (data: InputType) => {
    if (transactionValidCheck(data, state)) {
      setStep(SendStep.Review)
    }
  }

  const handleChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const handleSubmit = async () => {
    const data = methods.getValues()

    if (transactionValidCheck(data, state)) {
      const queryData = {
        walletId: Number(walletId),
        address: data.address,
        amount: catToMojo(data.amount),
        fee: chiaToMojo(data.fee),
        waitForConfirmation: false,
        memos: [data.memo || ''],
      }

      try {
        const response = await spendCAT(queryData).unwrap()
        setTransactionId(response.transactionId)
        setStep(SendStep.Result)
      } catch (e: any) {
        alert(e?.message || JSON.stringify(e))
      }
    }
  }

  const handleFinish = () => {
    methods.reset()
    navigate(-1)
  }

  return (
    <Box sx={{ overflow: 'auto', pb: 20, height: '100%' }}>
      <TransactionPrompt when={methods.formState.isDirty} />
      <FormProvider {...methods}>
        <Grid container sx={{ mt: 2 }}>
          <Grid
            item
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            {step === 1 && (
              <TransactionBackButton
                onClick={() => {
                  setStep(SendStep.Input)
                }}
                disabled={isSpendCatLoading}
              />
            )}
          </Grid>
          <Grid item sx={{ width: 720 }}>
            <TransactionStep
              steps={[
                {
                  subtitle: <Trans>Transaction Information</Trans>,
                },
                {
                  subtitle: <Trans>Review</Trans>,
                },
                {
                  subtitle: <Trans>Result</Trans>,
                },
              ]}
              selected={step}
            />
          </Grid>
          <Grid item sx={{ flex: 1 }} />
        </Grid>
        <TransactionContent>
          <TabPanel value={step} index={0}>
            <Stack>
              <Typography variant="h4" sx={{ m: 1 }} textAlign={'center'}>
                <Trans>Send</Trans>
              </Typography>
              <TransactionBody>
                <Typography
                  gutterBottom
                  sx={{
                    mb: '20px',
                  }}
                >
                  <Trans>Project information</Trans>
                </Typography>
                <TransactionBasicInfo infos={carbonTokenInfo} />
                <Typography
                  gutterBottom
                  sx={{
                    mb: '20px',
                  }}
                >
                  <Trans>Transaction information</Trans>
                </Typography>
                <form onSubmit={methods.handleSubmit(handleReview)}>
                  <SendInput />
                  <Stack
                    direction={'row'}
                    justifyContent={'flex-end'}
                    sx={{ mt: 1 }}
                    spacing={1}
                  >
                    <TransactionButton
                      variant="text"
                      onClick={() => {
                        navigate(-1)
                      }}
                    >
                      <Trans>Cancel</Trans>
                    </TransactionButton>

                    <TransactionButton
                      variant="contained"
                      type="submit"
                      disabled={!methods.formState.isValid}
                      endIcon={<ChevronRightIcon />}
                    >
                      <Trans>Next</Trans>
                    </TransactionButton>
                  </Stack>
                </form>
              </TransactionBody>
            </Stack>
          </TabPanel>
          <TabPanel value={step} index={1}>
            <Stack>
              <Typography variant="h4" sx={{ m: 2 }} textAlign={'center'}>
                <Trans>Review</Trans>
              </Typography>

              <TransactionBody>
                <Typography
                  gutterBottom
                  sx={{
                    mb: '20px',
                  }}
                >
                  <Trans>Transaction information</Trans>
                </Typography>
                <TransactionReviewList infos={reviewInfo} />
                <Alert severity="info">
                  <AlertTitle>
                    <Trans>Irrevocable once submitted</Trans>
                  </AlertTitle>
                  <Trans>
                    This action is irreversible once submitted, please ensure
                    the details here are correct.
                  </Trans>
                </Alert>
                <Stack sx={{ m: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleChangeCheck}
                      />
                    }
                    label={
                      <Trans>
                        I have confirmed that the transaction details are
                        correct.
                      </Trans>
                    }
                  />
                </Stack>

                <Stack
                  direction={'row'}
                  justifyContent={'flex-end'}
                  sx={{ mt: 2 }}
                  spacing={1}
                >
                  <TransactionButton
                    color="primary"
                    onClick={() => navigate(-1)}
                    disabled={isSpendCatLoading}
                  >
                    <Trans>Cancel</Trans>
                  </TransactionButton>

                  <TransactionLoadingButton
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!checked}
                    loading={isSpendCatLoading}
                    endIcon={<ChevronRightIcon />}
                  >
                    <Trans>Submit</Trans>
                  </TransactionLoadingButton>
                </Stack>
              </TransactionBody>
            </Stack>
          </TabPanel>
          <TabPanel value={step} index={2}>
            <TransactionResult
              transactionId={transactionId}
              onFinish={handleFinish}
            >
              <TransactionReviewList infos={reviewInfo} />
            </TransactionResult>
          </TabPanel>
        </TransactionContent>
      </FormProvider>
    </Box>
  )
}

export default Send
