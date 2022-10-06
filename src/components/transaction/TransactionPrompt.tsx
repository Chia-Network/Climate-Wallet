import usePrompt from '@/hooks/usePrompt'
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
  title?: string
  content?: string
}

const TransactionPrompt = ({
  when,
  title = 'Alert',
  content = 'Are you sure to leave?',
}: TransactionPrompt) => {
  const [showPrompt, setShowPrompt, next] = usePrompt(when)

  const handleClose = () => {
    setShowPrompt(false)
  }

  return (
    <Dialog open={showPrompt} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            next()
          }}
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TransactionPrompt
