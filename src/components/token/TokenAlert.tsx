import { useDetokenzationBlockingList } from '@/hooks/useLoaclStorage'
import { useSelectedWallet, useWalletState } from '@/hooks/wallet'
import { Trans } from '@lingui/macro'
import { Alert, AlertTitle } from '@mui/material'
const TokenAlert = () => {
  const { state } = useWalletState()
  const { walletId } = useSelectedWallet()
  const { isDetokenWallet } = useDetokenzationBlockingList()
  const isDetoken = isDetokenWallet(walletId)

  if (!isDetoken) {
    return null
  }

  return (
    <Alert
      severity="info"
      sx={{ paddingTop: '32px', paddingLeft: '32px', paddingBottom: '26px' }}
    >
      <AlertTitle>
        <Trans>This token is requesting detokenization</Trans>
      </AlertTitle>
      <Trans>
        Once a detokenization request file has been created, the tokens included
        in that request are not available for transfer or retirement until that
        file has been canceled.
      </Trans>
    </Alert>
  )
}

export default TokenAlert
