import {
  TransactionBackButton,
  TransactionBasicInfo,
  TransactionBody,
  TransactionContent,
  TransactionContentWidth,
  TransactionPrompt,
  TransactionResult,
  TransactionReviewList,
  TransactionStep,
} from '@/components/transaction'
import TabPanel from '@/components/UIKit/TabPanel'
import { CARBON_TOKEN_UNIT } from '@/constants/unit'
import useGetTransactionInfos from '@/hooks/useGetTransactionInfos'
import { useWallet, useWalletHumanValue, useWalletState } from '@/hooks/wallet'
import { useCreateRetirementTxMutation } from '@/services/climateService'
import { useGetCWAssetByIdQuery } from '@/services/climateWarehouse'
import { InputType, RetireStep } from '@/types/RetireType'
import {
  useGetCATAssetIdQuery,
  useGetWalletBalanceQuery,
} from '@chia/api-react'
import { catToMojo, chiaToMojo } from '@chia/core'
import { Trans } from '@lingui/macro'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { FormProvider, useForm, useFormState } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import RetireInput from './RetireInput'

const Retire = () => {
  const navigate = useNavigate()
  const { walletId } = useParams()
  const { wallet, unit, loading } = useWallet(walletId)

  const [creacteRetirement, { isLoading: isRetirementLoading }] =
    useCreateRetirementTxMutation()

  const methods = useForm<InputType>({
    defaultValues: {
      amount: '1',
      fee: '0.001',
      publicKey: 'xch...',
    },
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

  const reviewInfo = [
    ...carbonTokenInfo,
    {
      subtitle: <Trans>Send Quantity</Trans>,
      value: methods.getValues().amount,
    },
    {
      subtitle: <Trans>Transaction fee</Trans>,
      value: methods.getValues().fee,
    },

    {
      subtitle: <Trans>Beneficiary</Trans>,
      value: methods.getValues().beneficiary,
    },
    {
      subtitle: <Trans>Address</Trans>,
      value: methods.getValues().publicKey,
    },
  ]

  const [step, setStep] = useState<RetireStep>(RetireStep.Input)
  const [checked, setChecked] = useState<boolean>(false)
  const [transactionId, setTransactionId] = useState<string>('')

  const handlePrview = (data: InputType) => {
    setStep(RetireStep.Review)
  }

  const handleChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const handleCommit = async () => {
    const data = methods.getValues()

    const queryData = {
      token: {
        ...cwAsset,
        org_uid: cwAsset?.orgUid,
        project_id: cwAsset?.projectId,
        vintage_year: cwAsset?.vintageYear,
      },
      payment: {
        amount: catToMojo(data.amount),
        fee: chiaToMojo(data.fee),
        beneficiary_name: data.beneficiary,
        beneficiary_address: data.publicKey,
      },
    }

    try {
      const response = await creacteRetirement({
        data: queryData,
        assetId: assetId,
      }).unwrap()
      setTransactionId(response?.tx?.id)
      setStep(RetireStep.Result)
    } catch ({ message }) {
      alert(message)
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
                  setStep(RetireStep.Input)
                }}
                disabled={isRetirementLoading}
              />
            )}
          </Grid>
          <Grid item sx={{ width: TransactionContentWidth }}>
            <TransactionStep
              steps={[
                {
                  subtitle: 'Enter quantity to retire',
                },
                {
                  subtitle: 'Confirm transaction details',
                },
                {
                  subtitle: 'Transaction result',
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
                <Trans>Retire</Trans>
              </Typography>

              <TransactionBody>
                <Typography gutterBottom variant="body1">
                  <Trans>Project information</Trans>
                </Typography>
                <Typography color={'gray'} marginBottom={2} variant="body1">
                  <Trans>Please confirm project details.</Trans>
                </Typography>
                <TransactionBasicInfo infos={carbonTokenInfo} />
                <Typography gutterBottom variant="body1">
                  <Trans>Transaction information</Trans>
                </Typography>
                <Typography color={'gray'} marginBottom={2} variant="body1">
                  <Trans>Please fill in your transaction information.</Trans>
                </Typography>
                <form onSubmit={methods.handleSubmit(handlePrview)}>
                  <RetireInput />
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
                      Cancel
                    </Button>

                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={!methods.formState.isValid}
                      endIcon={<ChevronRightIcon />}
                    >
                      Review
                    </Button>
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
                    label="I have confirmed that the transaction details are correct."
                  />
                </Stack>

                <Stack
                  direction={'row'}
                  justifyContent={'flex-end'}
                  sx={{ mt: 2 }}
                  spacing={1}
                >
                  <Button
                    color="primary"
                    onClick={() => navigate(-1)}
                    disabled={isRetirementLoading}
                  >
                    <Trans>Cancel</Trans>
                  </Button>

                  <LoadingButton
                    color="primary"
                    variant="contained"
                    onClick={handleCommit}
                    disabled={!checked}
                    endIcon={<ChevronRightIcon />}
                    loading={isRetirementLoading}
                  >
                    <Trans>Commit</Trans>
                  </LoadingButton>
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

export default Retire