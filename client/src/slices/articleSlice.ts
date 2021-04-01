/*
 * File: articleSlice.ts
 * Created: Wednesday March 31st 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Wednesday March 31st 2021 5:44pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { createSlice } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from "../store";
import config from "../../../common/config.json";

import { Blog, Article } from "./blogSlice";

export type BaseAction = {
    type: string
};

export const articleSlice = createSlice({
    name: "article",
    initialState: {
        articles: new Map<string, Article>(),
        loading: false
    },
    reducers: {
        // Action for adding an article to the list
        addArticle: (state, action: BaseAction & {
            payload?: {
                slug: string,
                article: Article
            }
        }) => {
            // If action exists with payload attached, add it to our map
            if(action && action.payload){
                state.articles.set(action.payload.slug, action.payload.article);
                state.loading = false;

                console.log(state.articles);
            }
        },

        // Action to set loading state
        setIsLoading: (state, action: BaseAction & { payload?: boolean }) => {
            // If action exists with payload attached, set loading
            if(action && action.payload)
                state.loading = action.payload;
        }
    }
});

export default articleSlice.reducer;
export const { addArticle, setIsLoading } = articleSlice.actions;

export const getArticle = (slug: string) => (store: RootState) => store.articles.articles.get(slug);
export const getIsLoading = (store: RootState) => store.articles.loading;

export const loadArticle = (slug: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    // Existing articles
    const articles = getState().articles.articles;
    let result: Article;
    
    // Set state to "loading"
    dispatch({ ...setIsLoading, payload: true });
    console.log(`Loading article '${ slug }'...`);

    // Check if the article is already loaded
    if(!articles.has(slug)){

        // Fetch article from the servers database
        result = (await (await fetch(`http://${config.host}:${config.port}/article/${slug}`)).json())[0];

        console.log(result);

        // Add article to our map of articles
        dispatch({ ...addArticle, payload: { slug: slug, article: result }});
    }else{

        // Set result to existing article
        result = articles.get(slug);
    }

    // Set state to "we're done loading"
    dispatch({ ...setIsLoading, payload: false });

    console.log(result);

    // Return result
    return result;
};