/*
 * File: blogSlice.ts
 * Created: Sunday March 28th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Wednesday March 31st 2021 5:45pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { createSlice } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from "../store";
import config from "../../../common/config.json";

export type Blog = {
    id: number,
    title: string,
    slug: string,
    article?: Article
};

export type Article = {
    article: string,
    coffee: number,
    thumbsup: number,
    clap: number
}

export type BlogAction = {
    type: string,
    payload?: Blog[]
};

export type LoadedAction = BlogAction & {
    payload?: boolean
};

export type IncrementAction = BlogAction & {
    payload?: {
        id: number,
        option: "coffee" | "thumbsup" | "clap"
    }
};

export const blogSlice = createSlice({
    name: "blog",
    initialState: {
        blogs: [] as Blog[],
        loading: false
    },
    reducers: {
        loadBlogs: (state, action: BlogAction) => {
            if(action){
                state.blogs = action.payload;
                state.loading = false;
            }
        },
        // setLoaded: (state, action: LoadedAction) => {
        //     if(action)
        //         state.isLoaded = action.payload;
        // },
        // increment: (state, action: IncrementAction) => {
        //     if(action)
        //         state.blogs.forEach(blog => {
        //             if(blog.id === action.payload.id)
        //                 blog[action.payload.option]++;
        //         });
        // }
    }
});

export default blogSlice.reducer;

export const { loadBlogs } = blogSlice.actions;
export const getBlogs = (store: RootState) => store.blogs.blogs;
export const isLoading = (store: RootState) => store.blogs.loading;

export async function fetchBlogList(dispatch: AppDispatch, getState: () => RootState){
    console.log("Loading blogs...");

    const blogs = await (await fetch(`http://${config.host}:${config.port}/blogList`)).json();

    if(Array.isArray(blogs))
        dispatch({ ...loadBlogs(), payload: blogs });
}

// export async function fetchBlogs(dispatch: AppDispatch, getState: () => RootState){
//     console.log("Loading blogs");

//     const response = await fetch(`http://${config.host}:${config.port}/blogs`);
//     const blogs = await response.json();

//     if(Array.isArray(blogs)){
//         dispatch({ ...setBlogs(), payload: blogs });
//         dispatch({ ...setLoaded(), payload: true });
//     }
// }

export function getBlogBySlug(slug: string){
    return (store: RootState) => {
        let result: Blog | undefined = undefined;
    
        store.blogs.blogs.forEach(blog => {
            if(blog.slug === slug)
                result = blog;
        });
    
        return result;
    };
}