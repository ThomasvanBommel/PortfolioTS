/*
 * File: store.ts
 * Created: Wednesday March 24th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Wednesday March 31st 2021 11:41pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./slices/videoSlice";
import eventSlice from "./slices/eventSlice";
import blogSlice from "./slices/blogSlice2";

const store = configureStore({
    reducer: {
        videos: videoSlice,
        events: eventSlice,
        blogs: blogSlice,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch