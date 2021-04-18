/*
 * File: videoSlice.ts
 * Created: Thursday March 25th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 17th 2021 10:43pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-04-17	TvB	Added animated state
 * 2021-04-17	TvB	Added setCurrentIndex reducer
 */

import { YouTubeVideo } from "../../../common/types";
import { RootState, AppDispatch } from "../store";
import { createSlice } from '@reduxjs/toolkit'

export type LoadedAction = {
    type: string,
    payload?: boolean
};

export type VideoAction = {
    type: string,
    payload?: YouTubeVideo[]
};

export const videoSlice = createSlice({
    name: "video",
    initialState: {
        videos: [] as YouTubeVideo[],
        currentIndex: 0,
        isLoaded: false,
        autoScrolling: true
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
        },
        // Set the current video index
        setCurrentIndex: (state, { payload }: { payload: number }) => {
            if(payload != undefined)
                state.currentIndex = Math.max(Math.min(state.videos.length - 1, payload), 0);
        },
        // Set if videos should be animated (carousel)
        setAutoScrolling: (state, { payload }: { payload: boolean }) => {
            if(payload != undefined)
                state.autoScrolling = payload;
        }
    }
});

export default videoSlice.reducer;

export const { increment, decrement, setVideos, setLoaded, setCurrentIndex, setAutoScrolling } = videoSlice.actions;
export const getVideos = (store: RootState) => store.videos.videos;
export const isLoaded = (store: RootState) => store.videos.isLoaded;
export const autoScrolling = (store: RootState) => store.videos.autoScrolling;
export const getCurrentVideoIndex = (store: RootState) => store.videos.currentIndex;

export async function fetchVideos(dispatch: AppDispatch, getState: () => RootState) {
    console.log("Loading videos...");
    
    // const videos = await (await fetch(`https://${ config.host }:${config.port}/youtube`)).json();
    const videos = await (await fetch(new Request(`youtube`))).json();
    dispatch({ ...setVideos(), payload: videos });
    dispatch({ ...setLoaded(), payload: true });
}