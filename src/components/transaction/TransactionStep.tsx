import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Stack, Step, StepLabel, Stepper } from '@mui/material'
import { makeStyles, styled } from '@mui/material/styles'
import { ReactNode } from 'react'

interface Props {
  steps: { subtitle: string | ReactNode }[]
  selected?: number
}

const TransactionStep = ({ steps, selected }: Props) => {
  return (
    <Stack
      direction={'row'}
      spacing={1}
      sx={{ mb: 1, mt: 1 }}
      justifyContent={'center'}
    >
      <Stepper activeStep={selected}>
        {steps.map((step, index) => {
          return (
            <Step key={index}>
              <Stack direction={'row'} justifyContent={'center'}>
                <StepLabel> {step.subtitle}</StepLabel>
                {index !== steps.length - 1 && <ChevronRightIcon />}
              </Stack>
            </Step>
          )
        })}
      </Stepper>
    </Stack>
  )
}

TransactionStep.propTypes = {}

export default TransactionStep
