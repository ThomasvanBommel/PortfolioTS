/*
 * File: pageReducer.ts
 * Created: Wednesday March 24th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday March 25th 2021 12:51am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

// import { Store } from "redux";
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from "./store";

export enum Page {
    Home = "Home", 
    Contact = "Contact"
};

export type PageAction = {
    type: string,
    payload?: Page
};

export const pageSlice = createSlice({
    name: "page",
    initialState: {
        page: Page.Home
    },
    reducers: {
        setPage: (state, action: PageAction) => {
            state.page = action.payload;
        }
    }
});

export const getPage = (state: RootState) => state.page.page;
export const { setPage } = pageSlice.actions;

export type PageSliceType = typeof pageSlice;
export default pageSlice.reducer;

// export type PageState = {
//     page: Page
// };



// export default function pageReducer(state: PageState = { page: Page.Home }, action: PageAction)
// : PageState {

//     if(action.type === "page/set")
//         return { ...state, page: action.payload };

//     return state;
// }

// export function setPage(store: Store, page: Page){
//     store.dispatch({
//         type: "page/set",
//         payload: page
//     });
// }