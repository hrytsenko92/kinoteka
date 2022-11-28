import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const initialState = { value: "lightTheme" }

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    togleLight: (state, action: PayloadAction<string>) => {state.value = action.payload},
    togleDark: (state, action: PayloadAction<string>) => {state.value = action.payload},
  },
})

export const { togleLight, togleDark } = themeSlice.actions

export default themeSlice.reducer