/*
 * File: store.ts
 * Created: Wednesday March 24th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 3rd 2021 1:48pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "./slices/contactSlice";
import videoSlice from "./slices/videoSlice";
import eventSlice from "./slices/eventSlice";
import blogSlice from "./slices/blogSlice";

const store = configureStore({
    reducer: {
        contact: contactSlice,
        videos: videoSlice,
        events: eventSlice,
        blogs: blogSlice
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch