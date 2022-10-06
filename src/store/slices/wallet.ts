import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  walletId?: string
}

const initialState: State = {
  walletId: undefined,
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletId: (state, action: PayloadAction<string>) => {
      state.walletId = action.payload
    },
  },
})

export const { setWalletId } = walletSlice.actions

export const selectApiConfig = (state: any) => state.api.config

export default walletSlice.reducer
