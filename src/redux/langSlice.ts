import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const initialState = { value: "en-US" }
export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    togleUS: (state, action: PayloadAction<string>) => {state.value = action.payload},
    togleUKR: (state, action: PayloadAction<string>) => {state.value = action.payload},
  },
})
export const { togleUS, togleUKR } = langSlice.actions
export default langSlice.reducer