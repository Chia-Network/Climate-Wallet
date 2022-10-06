import { LoadingOverlay } from '@chia/core'
import { Trans } from '@lingui/macro'
import LoginIcon from '@mui/icons-material/Login'
import {
  Alert,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from '@mui/material'
import styled from 'styled-components'

const StyledFingerprintListItem = styled(ListItem)`
  padding-right: ${({ theme }) => `${theme.spacing(11)}`};
`

type Props = {
  fingerprint: number
  disabled?: boolean
  loading?: boolean
  onSelect: (fingerprint: number) => void
}

export default function SelectKeyItem(props: Props) {
  const { fingerprint, onSelect, disabled, loading } = props

  async function handleLogin() {
    onSelect(fingerprint)
  }

  return (
    <LoadingOverlay loading={loading} disabled={disabled}>
      <StyledFingerprintListItem
        data-testid={`SelectKeyItem-fingerprint-${fingerprint}`}
        key={fingerprint}
      >
        <ListItemText
          primary={
            <Trans>Private key with public fingerprint {fingerprint}</Trans>
          }
          secondary={<Trans>Can be backed up to mnemonic seed</Trans>}
        />
        <ListItemSecondaryAction>
          <Tooltip title={<Trans>Login</Trans>}>
            <IconButton
              edge="end"
              aria-label="show"
              onClick={handleLogin}
              data-testid={`SelectKeyItem-Login-${fingerprint}`}
            >
              <LoginIcon />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </StyledFingerprintListItem>
    </LoadingOverlay>
  )
}
