import LayoutLoadingWallet from '@/components/layout/LayoutLoadingWallet'
import { ConnectionState, PassphrasePromptReason } from '@chia/api'
import { useGetKeyringStatusQuery, useGetStateQuery } from '@chia/api-react'
import { LayoutHero } from '@chia/core'
import { ReactNode } from 'react'
import AppPassPrompt from './AppPassPrompt'

type Props = {
  children: ReactNode
}

export default function AppState(props: Props) {
  const { children } = props
  const { data: clientState = {}, isLoading: isClientStateLoading } =
    useGetStateQuery()
  const { data: keyringStatus, isLoading: isLoadingKeyringStatus } =
    useGetKeyringStatusQuery()

  const isConnected =
    !isClientStateLoading && clientState?.state === ConnectionState.CONNECTED

  const isLoading = isLoadingKeyringStatus || !keyringStatus || !isConnected

  if (isLoading) {
    return <LayoutLoadingWallet />
  }

  if (keyringStatus?.isKeyringLocked) {
    return (
      <LayoutHero>
        <AppPassPrompt reason={PassphrasePromptReason.KEYRING_LOCKED} />
      </LayoutHero>
    )
  }

  return <>{children}</>
}
