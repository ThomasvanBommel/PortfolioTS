/*
 * File: blogSlice2.ts
 * Created: Wednesday March 31st 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Wednesday March 31st 2021 11:25pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { 
    createSlice, 
    createAsyncThunk, 
    createEntityAdapter 
} from "@reduxjs/toolkit";
import * as API from "../serverApi";
import { RootState } from "../store";
import { Blog } from "../../../common/types";

// Fetch blogs thunk 
export const fetchAllBlogs = createAsyncThunk(
    "blogs/fetchAll",
    async () => {
        console.log("fetching blogs...");
        return await API.fetchAllBlogs();
    }
);

// Normalization adapter
const blogsAdapter = createEntityAdapter<Blog>({
    selectId: blog => blog.slug,
    sortComparer: (a, b) => a.slug.localeCompare(b.slug)
});

// Blog slice
const blogSlice = createSlice({
    name: "blogs",
    initialState: {
        ...blogsAdapter.getInitialState(),
        fetchedAll: false
    },
    reducers: {
        createBlog(state, action) {},
        updateBlog(state, action) {},
        deleteBlog(state, action) {}
    },
    extraReducers: builder => {
        builder.addCase(fetchAllBlogs.fulfilled, (state, action) => {
            state.fetchedAll = true;
            blogsAdapter.upsertMany(state, action);
        })
    }
});

/** Exports */

// Selectors
export const blogSelector = blogsAdapter.getSelectors<RootState>(state => state.blogs);
export const allBlogs = (state: RootState) => blogSelector.selectAll(state);
export const fetchedAll = (state: RootState) => state.blogs.fetchedAll;
export const getBlog = (slug: string) => (state:RootState) => blogSelector.selectById(state, slug);

// Actions
export const { createBlog, updateBlog, deleteBlog } = blogSlice.actions;

// Reducers
export default blogSlice.reducer;

