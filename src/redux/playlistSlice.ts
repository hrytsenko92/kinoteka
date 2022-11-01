import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface listState {
  value: number[];
}

const initialState: listState = {
  value: [],
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {state.value.push(action.payload)},
  },
})

export const { add } = playlistSlice.actions

export default playlistSlice.reducer