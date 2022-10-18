import LayoutLoadingWallet from '@/components/layout/LayoutLoadingWallet'
import { useGetLoggedInFingerprintQuery } from '@chia/api-react'
import { Trans } from '@lingui/macro'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function SelectKey() {
  const navigate = useNavigate()
  const {
    data: loggedInFingerprint,
    isLoading: isLoadingLoggedInFingerprint,
    error: errorLoadingLoggedInFingerprint,
  } = useGetLoggedInFingerprintQuery()

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

  if (isLoadingLoggedInFingerprint || errorLoadingLoggedInFingerprint) {
    return (
      <LayoutLoadingWallet loadingDesc={<Trans>Loading the login key</Trans>} />
    )
  }

  return <></>
}
