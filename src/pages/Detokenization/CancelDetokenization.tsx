import {
  TransactionBasicInfo,
  TransactionBody,
  TransactionButton,
  TransactionContent,
  TransactionFeeInput,
  TransactionLoadingButton,
  TransactionResult,
  TransactionReviewList,
  TransactionStep,
} from '@/components/transaction'
import TabPanel from '@/components/UIKit/TabPanel'
import { CARBON_TOKEN_UNIT } from '@/constants/unit'
import { useGetAllCWAssetsById } from '@/hooks/useGetAllCWAssets'
import useGetTransactionInfos from '@/hooks/useGetTransactionInfos'
import { useDetokenzationBlockingList } from '@/hooks/useLoaclStorage'
import { useWallet, useWalletHumanValue } from '@/hooks/wallet'
import {
  BlockingList,
  CancelInput,
  CancelStep,
} from '@/types/DetokenizationType'
import {
  useDeleteUnconfirmedTransactionsMutation,
  useGetCATAssetIdQuery,
  useGetCurrentAddressQuery,
  useGetWalletBalanceQuery,
  useSpendCATMutation,
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
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { ChangeEvent, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const CancelDetokenization = () => {
  const navigate = useNavigate()
  const { walletId } = useParams()
  const { unit } = useWallet(1)
  const { wallet } = useWallet(walletId)
  const { blockingList, setBlockingList } = useDetokenzationBlockingList()

  const { data: address } = useGetCurrentAddressQuery({
    walletId: 1,
  })

  const detokenizationInfo = blockingList?.find(
    (item) => item.walletId === walletId
  )

  const [spendCAT, { isLoading: isSpendCatLoading }] = useSpendCATMutation()
  const [
    deleteUnconfirmedTransactions,
    { isLoading: isDeleteUnconfirmedTransactionsLoading },
  ] = useDeleteUnconfirmedTransactionsMutation()

  const [step, setStep] = useState<CancelStep>(CancelStep.Input)
  const [checked, setChecked] = useState<boolean>(false)
  const [transactionId, setTransactionId] = useState<string>('')

  const methods = useForm<CancelInput>({
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
      subtitle: <Trans>Detokenization Quantity</Trans>,
      value: `${detokenizationInfo?.amount ?? 0} ${CARBON_TOKEN_UNIT}`,
    },
  ]

  const handleChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const onRemoveBlockingList = () => {
    const oldList: BlockingList = blockingList || []
    setBlockingList(oldList.filter((item) => item.walletId !== walletId))
  }

  const handleConfirm = async (data: CancelInput) => {
    const queryData = {
      walletId: Number(walletId),
      address: address,
      amount: walletBalance?.confirmedWalletBalance,
      fee: chiaToMojo(data.fee),
      waitForConfirmation: false,
    }

    try {
      await deleteUnconfirmedTransactions({ walletId }).unwrap()
      const response = await spendCAT(queryData).unwrap()
      setTransactionId(response.transactionId)
      onRemoveBlockingList()
      setStep(CancelStep.Result)
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  const handleFinish = () => {
    navigate(-1)
  }

  return (
    <Box sx={{ overflow: 'auto', pb: 20, height: '100%' }}>
      <FormProvider {...methods}>
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
                <Trans>
                  Please confirm your request detokenization details.
                </Trans>
              </Typography>

              <form onSubmit={methods.handleSubmit(handleConfirm)}>
                <TransactionBasicInfo infos={reviewInfo} />
                <TransactionFeeInput />
                <Alert severity="info">
                  <AlertTitle>
                    <Trans>Irrevocable once submitted</Trans>
                  </AlertTitle>
                  <Trans>
                    This action is irreversible once submitted, please ensure
                    the details here are correct.
                  </Trans>
                </Alert>
                <Stack sx={{ m: 1, mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleChangeCheck}
                      />
                    }
                    label={
                      <Trans>
                        Yes, I want to cancel the detokenization requirement.
                      </Trans>
                    }
                  />
                </Stack>
                <Stack
                  direction={'row'}
                  justifyContent={'flex-end'}
                  sx={{ mt: 1 }}
                  spacing={1}
                >
                  <TransactionButton
                    color="primary"
                    disabled={isDeleteUnconfirmedTransactionsLoading}
                    onClick={() => {
                      navigate(-1)
                    }}
                  >
                    <Trans>Cancel</Trans>
                  </TransactionButton>

                  <TransactionLoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!methods.formState.isValid || !checked}
                    endIcon={<ChevronRightIcon />}
                    loading={
                      isDeleteUnconfirmedTransactionsLoading ||
                      isSpendCatLoading
                    }
                  >
                    <Trans>Confirm</Trans>
                  </TransactionLoadingButton>
                </Stack>
              </form>
            </TransactionBody>
          </TabPanel>
          <TabPanel value={step} index={CancelStep.Result}>
            <Typography variant="h4" sx={{ m: 2 }} textAlign={'center'}>
              <Trans>Result</Trans>
            </Typography>
            <TransactionBody>
              <TransactionResult
                transactionId={transactionId}
                onFinish={handleFinish}
              >
                <TransactionReviewList
                  infos={[
                    ...reviewInfo,
                    {
                      subtitle: <Trans>Transaction fee</Trans>,
                      value: `${methods.getValues().fee} ${unit}`,
                    },
                  ]}
                />
              </TransactionResult>
            </TransactionBody>
          </TabPanel>
        </TransactionContent>
      </FormProvider>
    </Box>
  )
}

export default CancelDetokenization
