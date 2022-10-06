import LayoutDashboardSub from '@/components/layout/LayoutDashboardSub'

import TokenSidebar from './TokenSidebar'
import TokenWallet from './TokenWallet'

export default function TokenWalletCheck() {
  // TODO : refresh token wallets and navigate to the first token wallet

  return (
    <LayoutDashboardSub sidebar={<TokenSidebar />}>
      <TokenWallet />
    </LayoutDashboardSub>
  )
}
