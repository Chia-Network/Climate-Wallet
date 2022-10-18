import {
  CircularProgress,
  Stack,
  styled,
  Typography,
  type CircularProgressProps,
  type StackProps,
} from '@mui/material'
import { ReactNode } from 'react'

// TODO : refine the type
type ILoadingWithDescProps = StackProps &
  CircularProgressProps & {
    loadingDesc?: ReactNode
  }

interface ILoadingProps extends ILoadingWithDescProps {
  center?: boolean
}

const StyledCircularProgress = styled(CircularProgress)`
  color: ${({ theme }) => theme.palette.primary.main};
`

const LoadingWithDesc = ({ loadingDesc, ...rest }: ILoadingWithDescProps) => {
  if (loadingDesc) {
    return (
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        {...rest}
      >
        <StyledCircularProgress />
        <Typography
          variant="caption"
          color="textPrimary"
          sx={{ marginTop: '12px' }}
        >
          {loadingDesc}
        </Typography>
      </Stack>
    )
  }

  return <StyledCircularProgress {...rest} />
}

const Loading = ({ center, loadingDesc, ...rest }: ILoadingProps) => {
  if (center) {
    return (
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: '100%',
          height: '100%',
        }}
        {...rest}
      >
        <LoadingWithDesc loadingDesc={loadingDesc} />
      </Stack>
    )
  }

  return <LoadingWithDesc loadingDesc={loadingDesc} {...rest} />
}

export default Loading
