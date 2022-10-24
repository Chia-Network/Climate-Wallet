import { Loading } from '@/components/loading'
import {
  TokenAlert,
  TokenContent,
  TokenHeader,
  TokenHistory,
} from '@/components/token'
import { useDetokenzationBlockingList } from '@/hooks/useLoaclStorage'
import { useSelectedWallet } from '@/hooks/wallet'
import { Divider, Stack, styled } from '@mui/material'

const StyledStackRoot = styled(Stack)({
  width: '100%',
  height: '100%',
  overflowY: 'auto',
})

const StyledContainer = styled(Stack)({
  padding: '32px 40px 40px 32px',
})

const TokenWallet = () => {
  const { wallet, loading, walletId } = useSelectedWallet()
  const { isDetokenWallet } = useDetokenzationBlockingList()
  const isDetoken = isDetokenWallet(walletId)

  if (loading) {
    return (
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Loading sx={{ mt: '32px' }} />
      </Stack>
    )
  }

  if (!wallet) {
    return <></>
  }

  return (
    <StyledStackRoot>
      {isDetoken && <TokenAlert />}
      <StyledContainer spacing={3}>
        <TokenHeader />
        <TokenContent />
        <TokenHistory />
      </StyledContainer>
    </StyledStackRoot>
  )
}

export default TokenWallet
