import { configureStore } from '@reduxjs/toolkit';
import  playlistSlice  from "./playlistSlice";
import langSlice from "./langSlice"

export const store = configureStore({
    reducer: {
        playlist: playlistSlice,
        lang: langSlice
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch