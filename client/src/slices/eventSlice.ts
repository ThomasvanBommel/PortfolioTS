/*
 * File: repositorySlice.ts
 * Created: Sunday March 28th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 3rd 2021 10:07am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-04-03	TvB	Updated to use eventTypes
 */

import { createSlice } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from "../store";
import { Event } from "./eventTypes";

export type LoadedAction = {
    type: string,
    payload?: boolean
};

export type EventAction = {
    type: string,
    payload?: Event[]
};

export const eventSlice = createSlice({
    name: "event",
    initialState: {
        events: [] as Event[],
        isLoaded: false
    },
    reducers: {
        setEvents: (state, action: EventAction) => {
            if(action)
                state.events = action.payload;
        },
        setLoaded: (state, action: LoadedAction) => {
            if(action)
                state.isLoaded = action.payload;
        }
    }
});

export default eventSlice.reducer;

export const { setEvents, setLoaded } = eventSlice.actions;
export const getEvents = (store: RootState) => store.events.events;
export const isLoaded = (store: RootState) => store.events.isLoaded;

export async function fetchEvents(dispatch: AppDispatch, getState: () => RootState){
    console.log("Loading events...");

    const response = await fetch(`https://api.github.com/users/thomasvanbommel/events`);
    const events = await response.json();
    
    try{
        const remaining = Number(response.headers.get("x-ratelimit-remaining"));
        console.log("Reloads remaining: ", remaining);

        if(Array.isArray(events)){
            dispatch({ ...setEvents(), payload: events });
            dispatch({ ...setLoaded(), payload: true });
        }else{
            const reset = Math.round(((Number(response.headers.get("x-ratelimit-reset")) - Date.now() / 1000) / 60) * 10) / 10;

            if(remaining === 0 && reset > 0)
                alert(`You have 0 reloads remaining.\nPlease wait ${reset} minutes for it to reset.`);

            // console.log(response);
            console.log("Reset time (minutes): ", reset);
        }
    }catch{
        console.log("Could not parse github response");
    }
}