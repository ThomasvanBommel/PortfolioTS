/*
 * File: blogSlice2.ts
 * Created: Wednesday March 31st 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Wednesday March 31st 2021 9:11pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { createSlice } from "@reduxjs/toolkit";
import { Blog } from "../../../common/types";

const blogSlice = createSlice({
    name: "blogs",
    initialState: {
        loading: false,
        blogs: [] as Blog[]
    }, 
    reducers: {
        createBlog(state, action) {},
        updateBlog(state, action) {},
        deleteBlog(state, action) {},

        setLoading(state, { payload }: { payload: boolean }){
            state.loading = payload;
        }
    }
});

export const { createBlog, updateBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;

