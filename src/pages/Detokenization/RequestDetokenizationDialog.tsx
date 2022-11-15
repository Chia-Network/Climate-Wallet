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
import { styled } from '@mui/material/styles'
import { ChangeEvent, useEffect, useState } from 'react'

import { useDetokenzationDialogShowLocalStorage } from '@/hooks/useLoaclStorage'

const StyledQuestionButton = styled(Button)(({ theme }) => ({
  minWidth: 36,
  width: 36,
  height: 36,
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: 8,
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  position: 'absolute',
  right: 0,
}))

const RequestDetokenizationDialog = () => {
  const [notShowAgain, setNotShowAgain] =
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
            <Trans>Detokenization Process</Trans>
          </Typography>
          <Typography gutterBottom>
            <Trans>
              This process is only used when reverting tokenized units back to
              traditional units in a registry account. This process is NOT
              needed to retire carbon, nor is it needed to assert the validity
              of the token you hold.
            </Trans>
          </Typography>
          <Typography>
            <Trans>
              1) You must be an account holder at the issuing registry or work
              with an intermediary that is an account holder. The non-tokenized
              units will be credited to that account holder.
            </Trans>
          </Typography>
          <Typography>
            <Trans>
              2) You must get approval from the issuing registry before starting
              the detokenization process.
            </Trans>
          </Typography>
          <Typography>
            <Trans>
              3) Upon granting approval, the registry will provide a
              detokenization passcode.
            </Trans>
          </Typography>
          <Typography>
            <Trans>
              4) Using that passcode, the Climate Wallet will create a
              detokenization request file to be sent to the registry.
            </Trans>
          </Typography>
          <Typography>
            <Trans>
              5) The registry will confirm the detokenization request file is
              correct, sign it, and submit it to the blockchain.
            </Trans>
          </Typography>
          <Typography gutterBottom>
            <Trans>
              6) Once the tokens have been successfully destroyed, the registry
              will credit the appropriate non-tokenized units to the account
              holder.
            </Trans>
          </Typography>
          <Typography gutterBottom>
            <Trans>
              This process is only used when reverting tokenized units back to
              traditional units in a registry account. This process is NOT
              needed to retire carbon, nor is it needed to assert the validity
              of the token you hold.
            </Trans>
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
