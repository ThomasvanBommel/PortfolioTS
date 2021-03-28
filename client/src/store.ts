/*
 * File: store.ts
 * Created: Wednesday March 24th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Sunday March 28th 2021 1:20pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./slices/pageSlice";
import videoSlice from "./slices/videoSlice";
import eventSlice from "./slices/eventSlice";
import blogSlice from "./slices/blogSlice";
import thunkMiddleware from "redux-thunk";

const store = configureStore({
    reducer: {
        page: pageSlice,
        videos: videoSlice,
        events: eventSlice,
        blogs: blogSlice
    },
    middleware: [ thunkMiddleware ]
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch