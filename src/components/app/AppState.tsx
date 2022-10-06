import { ConnectionState, PassphrasePromptReason } from '@chia/api'
import { useGetKeyringStatusQuery, useGetStateQuery } from '@chia/api-react'
import { Flex, LayoutHero, LayoutLoading, useSkipMigration } from '@chia/core'
import { Trans } from '@lingui/macro'
import { Collapse, Typography } from '@mui/material'
import React, { ReactNode } from 'react'
import AppPassPrompt from './AppPassPrompt'

type Props = {
  children: ReactNode
}

export default function AppState(props: Props) {
  const { children } = props
  const { data: clienState = {}, isLoading: isClientStateLoading } =
    useGetStateQuery()
  const { data: keyringStatus, isLoading: isLoadingKeyringStatus } =
    useGetKeyringStatusQuery()

  const isConnected =
    !isClientStateLoading && clienState?.state === ConnectionState.CONNECTED

  if (isLoadingKeyringStatus || !keyringStatus) {
    return (
      <LayoutLoading>
        <Trans>Connecting to Chia Wallet</Trans>
      </LayoutLoading>
    )
  }

  if (keyringStatus?.isKeyringLocked) {
    return (
      <LayoutHero>
        <AppPassPrompt reason={PassphrasePromptReason.KEYRING_LOCKED} />
      </LayoutHero>
    )
  }

  if (!isConnected) {
    const { attempt } = clienState
    return (
      <LayoutLoading>
        {!attempt ? (
          <Trans>Connecting to Chia Wallet</Trans>
        ) : (
          <Flex flexDirection="column" gap={1}>
            <Typography variant="body1" align="center">
              <Trans>Please Open Chia Wallet</Trans>
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary">
              <Trans>Attempt {attempt}</Trans>
            </Typography>
          </Flex>
        )}
      </LayoutLoading>
    )
  }

  return <>{children}</>
}
