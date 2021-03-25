/*
 * File: store.ts
 * Created: Wednesday March 24th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday March 25th 2021 7:44pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./slices/pageSlice";
import videoSlice from "./slices/videoSlice";
import thunkMiddleware from "redux-thunk";

const store = configureStore({
    reducer: {
        page: pageSlice,
        videos: videoSlice
    },
    middleware: [ thunkMiddleware ]
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch