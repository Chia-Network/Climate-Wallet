import { Trans } from '@lingui/macro'
import { Alert, AlertTitle } from '@mui/material'

const TokenAlert = () => {
  return (
    <Alert
      severity="info"
      sx={{ paddingTop: '32px', paddingLeft: '32px', paddingBottom: '26px' }}
    >
      <AlertTitle>
        <Trans>This token is Requesting detokenization</Trans>
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
