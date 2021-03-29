/*
 * File: videoSlice.ts
 * Created: Thursday March 25th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Monday March 29th 2021 6:36pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { YouTubeVideo } from "common/types";
import { createSlice } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from "../store";
import { LoadedAction } from "./blogSlice";

const config = require("../../../common/.client.config.json");

export type VideoAction = {
    type: string,
    payload?: YouTubeVideo[]
};

export const videoSlice = createSlice({
    name: "video",
    initialState: {
        videos: [] as YouTubeVideo[],
        currentIndex: 0,
        isLoaded: false
    },
    reducers: {
        // Increment current index
        increment: state => {
            state.currentIndex = (state.currentIndex + 1) % state.videos.length;
        },
        // Decrement current index
        decrement: state => {
            state.currentIndex = Math.max(0, state.currentIndex - 1);
        },
        setVideos: (state, videos: VideoAction) => {
            if(videos.payload)
                state.videos = videos.payload;
        },
        setLoaded: (state, action: LoadedAction) => {
            if(action)
                state.isLoaded = action.payload;
        }
    }
});

export default videoSlice.reducer;

export const { increment, decrement, setVideos, setLoaded } = videoSlice.actions;
export const getVideos = (store: RootState) => store.videos.videos;
export const isLoaded = (store: RootState) => store.events.isLoaded;
export const getCurrentVideoIndex = (store: RootState) => store.videos.currentIndex;

export async function fetchVideos(dispatch: AppDispatch, getState: () => RootState) {
    console.log("Loading videos...");
    
    const videos = await (await fetch(`http://${config.host}:${config.port}/youtube`)).json();
    dispatch({ ...setVideos(), payload: videos });
    dispatch({ ...setLoaded(), payload: true });
}