import {
  useGetLoggedInFingerprintQuery,
  useGetPublicKeysQuery,
  useLogInAndSkipImportMutation,
} from '@chia/api-react'
import {
  Button,
  Flex,
  Loading,
  Logo,
  TooltipIcon,
  useOpenDialog,
  useShowError,
} from '@chia/core'
import { Trans } from '@lingui/macro'
import { Alert, Card, Container, List, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import SelectKeyItem from './SelectKeyItem'

const StyledContainer = styled(Container)`
  padding-bottom: 1rem;
`

export default function SelectKey() {
  const openDialog = useOpenDialog()
  const navigate = useNavigate()
  const [logIn, { isLoading: isLoadingLogIn }] = useLogInAndSkipImportMutation()
  const {
    data: publicKeyFingerprints,
    isLoading: isLoadingPublicKeys,
    error,
    refetch,
  } = useGetPublicKeysQuery()
  const {
    data: loggedInFingerprint,
    isLoading: isLoadingLoggedInFingerprint,
    error: errorLoadingLoggedInFingerprint,
    refetch: refetchoadingLoggedInFingerprint,
  } = useGetLoggedInFingerprintQuery()

  const hasFingerprints = !!publicKeyFingerprints?.length
  const [selectedFingerprint, setSelectedFingerprint] = useState<
    number | undefined
  >()

  const showError = useShowError()

  async function handleSelect(fingerprint: number) {
    if (selectedFingerprint) {
      return
    }

    try {
      setSelectedFingerprint(fingerprint)
      await logIn({
        fingerprint,
      }).unwrap()

      navigate('/dashboard/wallets')
    } catch (error) {
      showError(error)
    } finally {
      setSelectedFingerprint(undefined)
    }
  }

  useEffect(() => {
    if (loggedInFingerprint) {
      navigate('/dashboard/wallets')
    }
  }, [loggedInFingerprint])

  useEffect(() => {
    // NOTE : if loading time is more than 10 sec, then refresh
    const refreshTimer = setTimeout(() => {
      navigate(0)
    }, 10000)

    return () => {
      clearTimeout(refreshTimer)
    }
  }, [])

  return (
    <StyledContainer maxWidth="xs">
      <Flex flexDirection="column" alignItems="center" gap={3}>
        {/* TDOD : replace the chia logo */}
        <Logo width={130} />
        {isLoadingLoggedInFingerprint ? (
          <Loading center>
            <Trans>Loading the login key</Trans>
          </Loading>
        ) : errorLoadingLoggedInFingerprint ? (
          <Alert
            severity="error"
            action={
              <Button
                onClick={refetchoadingLoggedInFingerprint}
                color="inherit"
                size="small"
              >
                <Trans>Try Again</Trans>
              </Button>
            }
          >
            <Trans>Unable to load the list of the keys</Trans>
            &nbsp;
            <TooltipIcon>{errorLoadingLoggedInFingerprint.message}</TooltipIcon>
          </Alert>
        ) : hasFingerprints ? (
          <Typography variant="h5" component="h1">
            <Trans>Select Key for Climate Wallet</Trans>
          </Typography>
        ) : (
          <>
            <Typography variant="h5" component="h1">
              <Trans>Sign In</Trans>
            </Typography>
            <Typography variant="subtitle1" align="center">
              <Trans>
                Welcome to Chia. Please log in with an existing key, or create a
                new key.
              </Trans>
            </Typography>
          </>
        )}
        <Flex
          flexDirection="column"
          gap={3}
          alignItems="stretch"
          alignSelf="stretch"
        >
          {hasFingerprints && (
            <Card>
              <List>
                {publicKeyFingerprints.map((fingerprint: number) => (
                  <SelectKeyItem
                    key={fingerprint}
                    fingerprint={fingerprint}
                    onSelect={handleSelect}
                    loading={fingerprint === selectedFingerprint}
                    disabled={
                      !!selectedFingerprint &&
                      fingerprint !== selectedFingerprint
                    }
                  />
                ))}
              </List>
            </Card>
          )}
        </Flex>
      </Flex>
    </StyledContainer>
  )
}
