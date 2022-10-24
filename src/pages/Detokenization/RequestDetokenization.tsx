import {
  TransactionBasicInfo,
  TransactionBody,
  TransactionContent,
  TransactionPrompt,
} from '@/components/transaction'
import { CARBON_TOKEN_UNIT } from '@/constants/unit'
import { useGetAllCWAssetsById } from '@/hooks/useGetAllCWAssets'
import useGetTransactionInfos from '@/hooks/useGetTransactionInfos'
import { useDetokenzationBlockingList } from '@/hooks/useLoaclStorage'
import { useWallet, useWalletHumanValue } from '@/hooks/wallet'
import { useCreatDetokenizationTxMutation } from '@/services/climateService'
import {
  BlockingList,
  BlockingListContent,
  RequestInput,
} from '@/types/DetokenizationType'
import createDetokenFile from '@/util/createDetokenFile'
import {
  useGetCATAssetIdQuery,
  useGetWalletBalanceQuery,
} from '@chia/api-react'
import { catToMojo, chiaToMojo } from '@chia/core'
import { Trans } from '@lingui/macro'
import LoadingButton from '@mui/lab/LoadingButton'
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
import moment from 'moment'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import RequestDetokenizationDialog from './RequestDetokenizationDialog'

const RequestDetokenization = () => {
  const navigate = useNavigate()
  const { walletId } = useParams()
  const { wallet } = useWallet(walletId)
  const { unit } = useWallet(1)
  const { blockingList, setBlockingList } = useDetokenzationBlockingList()

  const [creacteDetokenzation, { isLoading: isDetokenzationLoading }] =
    useCreatDetokenizationTxMutation()

  const [checked, setChecked] = useState<boolean>(false)

  const { register, formState, handleSubmit, reset, getValues } =
    useForm<RequestInput>({
      defaultValues: {
        fee: '0.001 ',
      },
      mode: 'onChange',
    })

  const { data: assetId } = useGetCATAssetIdQuery({ walletId })
  const { data: cwAsset, isLoading: isLoadingAsset } =
    useGetAllCWAssetsById(assetId)
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
  const onSetBlockingList = (txId: string, content: string) => {
    const oldList: BlockingList = blockingList || []

    if (walletId && !oldList.some((item) => item.walletId === walletId)) {
      const amount = getValues().amount
      const newItem: BlockingListContent = {
        walletId: walletId,
        amount: String(amount),
        txId: txId,
        passphrase: getValues().passphrase,
        content: content,
        fileName: `detok-${amount}${CARBON_TOKEN_UNIT}-${moment().format(
          'YYYY-MM-DD'
        )}`,
      }

      setBlockingList([...oldList, newItem])
      createDetokenFile(newItem)
    }
  }

  const handleSave = async (data: RequestInput) => {
    if (cwAsset) {
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

          assetId: assetId,
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
                  label={<Trans>fee</Trans>}
                  fullWidth
                  {...register('fee', {
                    required: true,
                  })}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">{unit}</InputAdornment>
                    ),
                  }}
                />
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
                disabled={isDetokenzationLoading}
              >
                <Trans>Cancel</Trans>
              </Button>

              <LoadingButton
                color="primary"
                variant="contained"
                type="submit"
                disabled={!formState.isValid || !checked}
                loading={isDetokenzationLoading}
              >
                <Trans>Save request</Trans>
              </LoadingButton>
            </Stack>
          </TransactionBody>
        </TransactionContent>
      </form>
    </Box>
  )
}

export default RequestDetokenization
