import AppProviders from '@/components/app/AppProviders'
import AppStatusHeader from '@/components/app/AppStatusHeader'
import Layout from '@/components/layout/Layout'
import {
  CancelDetokenization,
  RequestDetokenization,
} from '@/pages/Detokenization'
import Retire from '@/pages/Retire'
import SelectKey from '@/pages/SelectKey'
import Send from '@/pages/Send'
import NoTokensFound from '@/pages/NoTokensFound'
import TokenWalletCheck from '@/pages/TokenWallet'
import { checkConfig } from '@/util/yamlConfigLoader'
import { useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AppRouter() {
  useEffect(() => {
    checkConfig()
  }, [])
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<AppProviders outlet />}>
            <Route index element={<SelectKey />} />
            <Route element={<Layout actions={<AppStatusHeader />} outlet />}>
              <Route path="dashboard" element={<Navigate to="wallets" />} />
              <Route
                path="dashboard/wallets/no-token"
                element={<NoTokensFound />}
              />
              <Route
                path="dashboard/wallets/*"
                element={<TokenWalletCheck />}
              />

              <Route
                path="dashboard/wallets/send/:walletId"
                element={<Send />}
              />
              <Route
                path="dashboard/wallets/retire/:walletId"
                element={<Retire />}
              />
              <Route
                path="dashboard/wallets/detokenization/request/:walletId"
                element={<RequestDetokenization />}
              />
              <Route
                path="dashboard/wallets/detokenization/cancel/:walletId"
                element={<CancelDetokenization />}
              />

              <Route path="dashboard/*" element={<Navigate to="wallets" />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
