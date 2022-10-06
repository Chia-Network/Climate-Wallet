import { Box, Card, Divider, Stack, Typography, useTheme } from '@mui/material'
import { PropsWithChildren, ReactNode } from 'react'

interface ITokenCardProps {
  icon: ReactNode
  title: ReactNode
}

const paddingLeft = 7

const TokenCard = ({
  icon,
  title,
  children,
}: PropsWithChildren<ITokenCardProps>) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        color: theme.palette.text.secondary,
        flex: 1,
      }}
    >
      <Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            px: paddingLeft,
            py: '10px',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: '18px',
              top: '8px',
            }}
          >
            {icon}
          </Box>
          <Typography variant="body2" fontWeight={500}>
            {title}
          </Typography>
        </Stack>
        <Divider />
        <Stack
          spacing={1}
          sx={{
            paddingLeft: paddingLeft,
            paddingRight: 3,
            py: '16px',
          }}
        >
          {children}
        </Stack>
      </Stack>
    </Card>
  )
}

export default TokenCard
