import { configureStore } from '@reduxjs/toolkit';
import playlistSlice from "./playlistSlice";
import langSlice from "./langSlice"
import themeSlice from "./themeSlice"

export const store = configureStore({
    reducer: {
        playlist: playlistSlice,
        lang: langSlice,
        theme: themeSlice
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch