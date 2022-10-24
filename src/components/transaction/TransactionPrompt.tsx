import usePrompt from '@/hooks/usePrompt'
import { Trans } from '@lingui/macro'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

interface TransactionPrompt {
  when: boolean
  content?: string
}

const TransactionPrompt = ({
  when,
  content = 'Are you sure to leave?',
}: TransactionPrompt) => {
  const [showPrompt, setShowPrompt, next] = usePrompt(when)

  const handleClose = () => {
    setShowPrompt(false)
  }

  return (
    <Dialog open={showPrompt} onClose={handleClose}>
      <DialogContent sx={{ width: 300 }}>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          <Trans>No</Trans>
        </Button>
        <Button
          onClick={() => {
            next()
          }}
        >
          <Trans>Yes</Trans>
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TransactionPrompt
