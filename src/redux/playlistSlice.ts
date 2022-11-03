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
    remove: (state, action: PayloadAction<number>) => {state.value.filter((e) => {e !== action.payload})} // ???
  },
})

export const { add, remove } = playlistSlice.actions

export default playlistSlice.reducer