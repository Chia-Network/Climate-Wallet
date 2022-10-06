import { IUseWalletProps, useWallet } from '@/hooks/wallet'
import { CWAsset } from '@/types/ClimateWarehouseType'
import { createContext, PropsWithChildren, useState } from 'react'

interface IWalletContext extends IUseWalletProps {
  // TODO : after check the token type, add token too
  walletId?: number | string
  setWalletId: (walletId: number | string | undefined) => void
}

export const WalletContext = createContext<IWalletContext>({
  walletId: undefined,
  setWalletId: () => {},
  wallet: undefined,
  unit: '',
  loading: false,
})

interface IWalletProviderProps {
  // walletId: number | string
}

export function WalletProvider({
  children,
}: PropsWithChildren<IWalletProviderProps>) {
  const [walletId, setWalletId] = useState<string | number | undefined>(
    undefined
  )
  const { wallet, unit = '', loading: isLoadingWallet } = useWallet(walletId)

  return (
    <WalletContext.Provider
      value={{
        wallet,
        setWalletId,
        unit,
        loading: isLoadingWallet,
        walletId,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
