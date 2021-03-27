/*
 * File: pageSlice.ts
 * Created: Wednesday March 24th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday March 27th 2021 2:16pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-25	TvB	Cleaned up, Added comments + renamed file
 */

import { createSlice } from '@reduxjs/toolkit'
import { RootState } from "../store";

// Page options
export enum Page {
    Home = "Home", 
    Contact = "Contact",
    Blog = "Blog"
};

// Page action object (redux)
export type PageAction = {
    type: string,
    payload?: Page
};

// Page slice (redux)
export const pageSlice = createSlice({
    name: "page",
    initialState: {
        page: Page.Home,
        lastPage: Page.Home
    },
    reducers: {
        setPage: (state, action: PageAction) => {
            if(action.payload){
                state.lastPage = state.page;
                state.page = action.payload;
            }
        }
    }
});

// Get / Set page functions
export const getPage = (state: RootState) => state.page.page;
export const getLastPage = (state: RootState) => state.page.lastPage;
export const { setPage } = pageSlice.actions;

// Redux reducer functions
export default pageSlice.reducer;