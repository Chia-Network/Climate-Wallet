import { useDetokenzationDialogShowLocalStorage } from '@/hooks/useLoaclStorage'
import { Trans } from '@lingui/macro'
import CloseIcon from '@mui/icons-material/Close'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { ChangeEvent, useEffect, useState } from 'react'

const StyledQuestionButton = styled(Button)(({ theme }) => ({
  minWidth: 36,
  width: 36,
  height: 36,
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: 8,
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
}))

const RequestDetokenizationDialog = () => {
  const theme = useTheme()

  const [notShowAgain, setNotShowAgain, remove] =
    useDetokenzationDialogShowLocalStorage()

  const [open, setOpen] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)

    if (!notShowAgain) {
      setChecked(false)
    }
  }
  const handleChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const handleComfirm = () => {
    setNotShowAgain(checked)
    setOpen(false)
  }

  useEffect(() => {
    if (notShowAgain) {
      setChecked(true)
    } else {
      setOpen(true)
    }
  }, [])

  return (
    <>
      <StyledQuestionButton onClick={handleOpen}>
        <QuestionMarkIcon />
      </StyledQuestionButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Stack alignItems={'flex-end'} sx={{ mb: 1, p: 2 }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <Stack alignItems={'center'} sx={{ m: 0, p: 2 }}>
          <Typography variant="h6">
            <Trans>What is request detokenization?</Trans>
          </Typography>
        </Stack>

        <DialogContent>
          <Typography gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque sed aliquam lectus. Suspendisse consequat fermentum
            nunc, posuere laoreet ligula suscipit a. In turpis nulla, rhoncus eu
            iaculis ac, fringilla a risus. Suspendisse varius maximus
            pellentesque.
          </Typography>
          <Typography gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque sed aliquam lectus. Suspendisse consequat fermentum
            nunc, posuere laoreet ligula suscipit a. In turpis nulla, rhoncus eu
            iaculis ac, fringilla a risus. Suspendisse varius maximus
            pellentesque.
          </Typography>
          <Typography gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque sed aliquam lectus. Suspendisse consequat fermentum
            nunc, posuere laoreet ligula suscipit a. In turpis nulla, rhoncus eu
            iaculis ac, fringilla a risus. Suspendisse varius maximus
            pellentesque.
          </Typography>
        </DialogContent>

        <Stack alignItems={'center'}>
          <FormControlLabel
            control={
              <Checkbox checked={checked} onChange={handleChangeCheck} />
            }
            label="Do not show again."
          />
        </Stack>

        <Stack alignItems={'center'} sx={{ mb: 2, p: 2 }}>
          <Button onClick={handleComfirm} variant={'contained'}>
            confirm
          </Button>
        </Stack>
      </Dialog>
    </>
  )
}

export default RequestDetokenizationDialog
