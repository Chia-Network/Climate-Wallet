import { Wallet } from '@chia/api'
import { chiaApi } from '@chia/api-react'
import BigNumber from 'bignumber.js'

export const walletApi = chiaApi.injectEndpoints({
  endpoints: (build) => ({
    getWalletsBalance: build.mutation({
      query: ({ walletId }) => ({
        command: 'getWalletBalance',
        service: Wallet,
        args: [walletId],
      }),
      transformResponse: (response) => {
        const {
          walletBalance,
          walletBalance: { confirmedWalletBalance, unconfirmedWalletBalance },
        } = response

        const pendingBalance = new BigNumber(unconfirmedWalletBalance).minus(
          confirmedWalletBalance
        )
        const pendingTotalBalance = new BigNumber(confirmedWalletBalance).plus(
          pendingBalance
        )

        return {
          ...walletBalance,
          pendingBalance,
          pendingTotalBalance,
        }
      },
    }),
  }),
})

export const { useGetWalletsBalanceMutation } = walletApi
