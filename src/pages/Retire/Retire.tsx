import {
  TransactionBackButton,
  TransactionBasicInfo,
  TransactionBody,
  TransactionButton,
  TransactionContent,
  TransactionContentWidth,
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
import {
  useCreateRetirementTxMutation,
  useGetRetireKeysParseMutation,
} from '@/services/climateService'
import { InputType, RetireStep } from '@/types/RetireType'
import transactionValidCheck from '@/util/transactionValidCheck'
import {
  useGetCATAssetIdQuery,
  useGetWalletBalanceQuery,
} from '@chia/api-react'
import { catToMojo, chiaToMojo } from '@chia/core'
import { Trans } from '@lingui/macro'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
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
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import RetireInput from './RetireInput'

const Retire = () => {
  const navigate = useNavigate()
  const { walletId } = useParams()
  const { wallet, unit, loading } = useWallet(walletId)
  const { state } = useWalletState()

  const [creacteRetirement, { isLoading: isRetirementLoading }] =
    useCreateRetirementTxMutation()

  const [getRetireKeysParse] = useGetRetireKeysParseMutation()

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
      subtitle: <Trans>Retire Quantity</Trans>,
      value: methods.getValues().amount,
    },
    {
      subtitle: <Trans>Transaction fee</Trans>,
      value: methods.getValues().fee,
    },

    {
      subtitle: <Trans>Beneficiary Name</Trans>,
      value: methods.getValues().beneficiary,
    },
    {
      subtitle: <Trans>Beneficiary Public Key</Trans>,
      value: methods.getValues().publicKey,
    },
  ]

  const [step, setStep] = useState<RetireStep>(RetireStep.Input)
  const [checked, setChecked] = useState<boolean>(false)
  const [transactionId, setTransactionId] = useState<string>('')

  const handlePrview = async (data: InputType) => {
    try {
      setStep(RetireStep.Review)
    } catch (error) {
      alert('Climate service error')
    }
  }

  const handleChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const handleSubmit = async () => {
    const data = methods.getValues()

    if (cwAsset && transactionValidCheck(data, state)) {
      try {
        const response = await creacteRetirement({
          data: {
            token: {
              org_uid: cwAsset.orgUid,
              warehouse_project_id: cwAsset.warehouse_project_id,
              vintage_year: cwAsset.vintageYear,
              sequence_num: cwAsset.sequence_num,
              index: cwAsset.index,
              public_key: cwAsset.public_key,
              asset_id: cwAsset.asset_id,
              permissionless_retirement: cwAsset.permissionless_retirement,
            },
            payment: {
              amount: catToMojo(data.amount),
              fee: chiaToMojo(data.fee),
              beneficiary_name: data.beneficiary,
              beneficiary_address: data.publicKey,
            },
          },
          assetId: assetId,
        }).unwrap()
        setTransactionId(response?.tx?.id)
        setStep(RetireStep.Result)
      } catch (e) {
        //@ts-ignore
        alert(e?.error || JSON.stringify(e))
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
                <Trans>Token Retirement</Trans>
              </Typography>

              <TransactionBody>
                <Typography
                  gutterBottom
                  variant="body1"
                  sx={{
                    mb: '20px',
                  }}
                >
                  <Trans>Project information</Trans>
                </Typography>
                <TransactionBasicInfo infos={carbonTokenInfo} />
                <Typography
                  gutterBottom
                  variant="body1"
                  sx={{
                    mb: '20px',
                  }}
                >
                  <Trans>Transaction information</Trans>
                </Typography>
                <form onSubmit={methods.handleSubmit(handlePrview)}>
                  <RetireInput />
                  <Stack
                    direction={'row'}
                    justifyContent={'flex-end'}
                    sx={{ mt: 1 }}
                    spacing={1}
                  >
                    <TransactionButton
                      color="primary"
                      onClick={() => {
                        navigate(-1)
                      }}
                    >
                      Cancel
                    </TransactionButton>

                    <TransactionButton
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={!methods.formState.isValid}
                      endIcon={<ChevronRightIcon />}
                    >
                      Review
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
                  <TransactionButton
                    color="primary"
                    onClick={() => navigate(-1)}
                    disabled={isRetirementLoading}
                  >
                    <Trans>Cancel</Trans>
                  </TransactionButton>

                  <TransactionLoadingButton
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!checked}
                    endIcon={<ChevronRightIcon />}
                    loading={isRetirementLoading}
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

export default Retire
