/*
 * File: repositorySlice.ts
 * Created: Sunday March 28th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Monday March 29th 2021 6:34pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { createSlice } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from "../store";
import { LoadedAction } from "./blogSlice";

export type Event = {
    id: number,
    type: string
};

export type Commit = {
    sha: string,
    author: {
        email: string,
        name: string
    },
    message: string,
    distinct: boolean,
    url: string
};

export type PushEvent = Event & {
    actor: {
        id: number,
        login: string,
        display_login: string,
        gravatar_id: string,
        url: string,
        avatar_url: string
    },
    repo: {
        id: number,
        name: string,
        url: string
    },
    payload: {
        push_id: number,
        size: number,
        distinct_size: number,
        ref: string,
        head: string,
        before: string,
        commits: Commit[]
    },
    public: boolean,
    created_at: string
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