/*
 * File: store.ts
 * Created: Wednesday March 24th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Monday March 29th 2021 6:30pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./slices/videoSlice";
import eventSlice from "./slices/eventSlice";
import blogSlice from "./slices/blogSlice";
import thunkMiddleware from "redux-thunk";

const store = configureStore({
    reducer: {
        videos: videoSlice,
        events: eventSlice,
        blogs: blogSlice
    },
    middleware: [ thunkMiddleware ]
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch