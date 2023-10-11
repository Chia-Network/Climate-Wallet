import {
  useGetCATAssetIdQuery,
  useGetWalletBalanceQuery,
} from '@chia/api-react'
import { catToMojo, chiaToMojo } from '@chia/core'
import { Trans } from '@lingui/macro'
import {
  Alert,
  AlertTitle,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import moment from 'moment'
import { ChangeEvent, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import {
  TransactionBasicInfo,
  TransactionBody,
  TransactionButton,
  TransactionCATInput,
  TransactionContent,
  TransactionFeeInput,
  TransactionLoadingButton,
  TransactionPrompt,
} from '@/components/transaction'
import { CARBON_TOKEN_UNIT } from '@/constants/unit'
import { useGetAllCWAssetsById } from '@/hooks/useGetAllCWAssets'
import useGetTransactionInfos from '@/hooks/useGetTransactionInfos'
import { useDetokenzationBlockingList } from '@/hooks/useLoaclStorage'
import { useWallet, useWalletHumanValue, useWalletState } from '@/hooks/wallet'
import { useCreatDetokenizationTxMutation } from '@/services/climateService'
import {
  BlockingList,
  BlockingListContent,
  RequestInput,
} from '@/types/DetokenizationType'
import createDetokenFile from '@/util/createDetokenFile'
import transactionValidCheck from '@/util/transactionValidCheck'

import RequestDetokenizationDialog from './RequestDetokenizationDialog'

const RequestDetokenization = () => {
  const navigate = useNavigate()
  const { walletId } = useParams()
  const { wallet } = useWallet(walletId)
  const { blockingList, setBlockingList } = useDetokenzationBlockingList()
  const { state } = useWalletState()

  const [creacteDetokenzation, { isLoading: isDetokenzationLoading }] =
    useCreatDetokenizationTxMutation()

  const [checked, setChecked] = useState<boolean>(false)

  const methods = useForm<RequestInput>({
    defaultValues: {
      fee: '0.001',
    },
    mode: 'onChange',
  })
  const { register, formState, handleSubmit, reset, getValues } = methods

  const { data: assetId } = useGetCATAssetIdQuery(
    { walletId: walletId },
    { skip: !walletId }
  )
  const { data: cwAsset } = useGetAllCWAssetsById(assetId)
  const { data: walletBalance } = useGetWalletBalanceQuery(
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

  const handleChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  const onSetBlockingList = (txId: string, content: string) => {
    const oldList: BlockingList = blockingList || []

    if (walletId && !oldList.some((item) => item.walletId === walletId)) {
      const amount = getValues().amount
      const newItem: BlockingListContent = {
        walletId,
        amount: String(amount),
        txId,
        passphrase: getValues().passphrase,
        content,
        fileName: `detok-${amount}${CARBON_TOKEN_UNIT}-${moment().format(
          'YYYY-MM-DD'
        )}`,
      }

      setBlockingList([...oldList, newItem])
      createDetokenFile(newItem)
    }
  }

  const handleSave = async (data: RequestInput) => {
    if (cwAsset && transactionValidCheck(data, state)) {
      try {
        const response = await creacteDetokenzation({
          data: {
            token: {
              org_uid: cwAsset.orgUid,
              warehouse_project_id: cwAsset.warehouse_project_id,
              vintage_year: cwAsset.vintageYear,
              sequence_num: cwAsset.sequence_num,
              index: cwAsset.index,
              public_key: cwAsset.public_key,
              asset_id: cwAsset.asset_id,
              detokenization: cwAsset.detokenization,
            },
            payment: {
              amount: catToMojo(data.amount),
              fee: chiaToMojo(0),
            },
          },

          assetId,
        }).unwrap()

        onSetBlockingList(response?.tx?.id, response?.content)
        reset()
        navigate(-1)
      } catch (e) {
        alert(JSON.stringify(e))
      }
    }
  }

  return (
    <Box sx={{ overflow: 'auto', pb: 20, height: '100%' }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSave)}>
          <TransactionPrompt when={formState.isDirty} />
          <TransactionContent>
            <Stack
              justifyContent={'center'}
              direction={'row'}
              alignItems={'center'}
              sx={{ position: 'relative' }}
            >
              <Typography variant="h4" sx={{ m: 2 }} textAlign={'center'}>
                <Trans>Request Detokenization</Trans>
              </Typography>

              <RequestDetokenizationDialog />
            </Stack>
            <TransactionBody>
              <Typography
                sx={{
                  mb: '20px',
                }}
              >
                <Trans>Project information</Trans>
              </Typography>
              <TransactionBasicInfo infos={carbonTokenInfo} />
              <Typography
                sx={{
                  mb: '20px',
                }}
              >
                <Trans>Request Detokenization</Trans>
              </Typography>

              <Grid sx={{ mt: 1, mb: 5 }} container spacing={2}>
                <Grid xs={6} item>
                  <TransactionCATInput />
                </Grid>
                <Grid xs={6} item>
                  <TransactionFeeInput />
                </Grid>
                <Grid xs={12} item>
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleChangeCheck}
                      sx={{ paddingTop: 0 }}
                    />
                  }
                  label={
                    <Trans>
                      I have confirmed that the detokenization details are
                      correct and I want to request detokenization.
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
                  onClick={() => {
                    navigate(-1)
                  }}
                  disabled={isDetokenzationLoading}
                >
                  <Trans>Cancel</Trans>
                </TransactionButton>

                <TransactionLoadingButton
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={!methods.formState.isValid || !checked}
                  loading={isDetokenzationLoading}
                >
                  <Trans>Save request</Trans>
                </TransactionLoadingButton>
              </Stack>
            </TransactionBody>
          </TransactionContent>
        </form>
      </FormProvider>
    </Box>
  )
}

export default RequestDetokenization
