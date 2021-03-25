/*
 * File: videoSlice.ts
 * Created: Thursday March 25th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday March 25th 2021 6:19pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { YouTubeVideo } from "../../../common/types";
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from "../store";

export const videoSlice = createSlice({
    name: "video",
    initialState: {
        videos: [] as YouTubeVideo[],
        currentIndex: 0
    },
    reducers: {
        // Increment current index
        increment: state => {
            state.currentIndex = state.currentIndex % state.videos.length;
        },
        // Decrement current index
        decrement: state => {
            state.currentIndex = Math.max(0, state.currentIndex - 1);
        }
    }
});