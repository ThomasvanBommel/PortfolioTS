/*
 * File: blogSlice2.ts
 * Created: Wednesday March 31st 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 3rd 2021 1:45pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-04-01	TvB	Added incrementCoffeeCount thunk
 */

import { 
    createSlice, 
    createAsyncThunk, 
    createEntityAdapter 
} from "@reduxjs/toolkit";
import * as API from "../serverApi";
import { RootState } from "../store";
import { Blog, Emoji } from "../../../common/types";

/** Thunks -------------------------------------------------------------------------------------- */

// Fetch blogs thunk 
export const fetchAllBlogs = createAsyncThunk(
    "blogs/fetchAll",
    async () => {
        console.log("Fetching blogs...");
        return await API.fetchAllBlogs();
    }
);

// Increment blogs emoji count thunk
export const incrementEmojiCount = createAsyncThunk(
    "blogs/incrementCoffee",
    async (options: { slug: string, emoji: Emoji }, thinkAPI) => 
        await API.incrementEmojiCount(options.slug, options.emoji)
);

/** Adapters ------------------------------------------------------------------------------------ */

// Normalization adapter
const blogsAdapter = createEntityAdapter<Blog>({
    selectId: blog => blog.slug,
    sortComparer: (a, b) => a.slug.localeCompare(b.slug)
});

/** Slices -------------------------------------------------------------------------------------- */

// Blog slice
const blogSlice = createSlice({
    name: "blogs",
    initialState: {
        ...blogsAdapter.getInitialState(),
        fetchedAll: false
    },
    reducers: {
        // createBlog(state, action) {},
        // updateBlog(state, action) {},
        // deleteBlog(state, action) {}
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllBlogs.fulfilled, (state, action) => {
                state.fetchedAll = true;
                blogsAdapter.upsertMany(state, action);
            })
            .addCase(incrementEmojiCount.fulfilled, (state, { payload }) => {
                console.log("incrementEmojiCount Fulfilled:");
                blogsAdapter.upsertOne(state, payload as Blog);
            })
            .addCase(incrementEmojiCount.rejected, (state, action) => {
                console.log("incrementEmojiCount Rejected:", action);
            })
    }
});

/** Exports ------------------------------------------------------------------------------------- */

// Selectors
export const blogSelector = blogsAdapter.getSelectors<RootState>(state => state.blogs);
export const allBlogs = (state: RootState) => blogSelector.selectAll(state);
export const fetchedAll = (state: RootState) => state.blogs.fetchedAll;
export const getBlog = (slug: string) => (state: RootState) => blogSelector.selectById(state, slug);

// Actions
// export const { createBlog, updateBlog, deleteBlog } = blogSlice.actions;

// Reducers
export default blogSlice.reducer;

