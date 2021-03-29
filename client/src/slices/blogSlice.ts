/*
 * File: blogSlice.ts
 * Created: Sunday March 28th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Monday March 29th 2021 6:08pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { createSlice } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from "../store";

const config = require("../../../common/.client.config.json");

export type Blog = {
    title: string,
    article: string,
    coffee: number,
    thumbsup: number,
    clap: number
};

export type BlogAction = {
    type: string,
    payload?: Blog[]
};

export const blogSlice = createSlice({
    name: "blog",
    initialState: {
        blogs: [] as Blog[],
    },
    reducers: {
        setBlogs: (state, action: BlogAction) => {
            if(action)
                state.blogs = action.payload;
        }
    }
});

export default blogSlice.reducer;

export const { setBlogs } = blogSlice.actions;
export const getBlogs = (store: RootState) => store.blogs.blogs;

export async function fetchBlogs(dispatch: AppDispatch, getState: () => RootState){
    console.log("Loading blogs...");

    const response = await fetch(`http://${config.host}:${config.port}/blogs`);
    const blogs = await response.json();

    if(Array.isArray(blogs))
        dispatch({ ...setBlogs(), payload: blogs });
}