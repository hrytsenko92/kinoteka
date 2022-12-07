import { createSlice, PayloadAction } from '@reduxjs/toolkit'



export type listState = {
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
    remove: (state, action: PayloadAction<number>) => {state.value = state.value.filter((item)=>item !== action.payload), console.log(state)} 
  },
})

export const { add, remove } = playlistSlice.actions

export default playlistSlice.reducer