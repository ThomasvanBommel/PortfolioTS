/*
 * File: Detail.tsx
 * Created: Wednesday March 31st 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday April 20th 2021 11:09am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-04-20	TvB	Added react helmet support
 * 2021-03-31	TvB	Updated to work with blogSlice 2.0
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { 
    getBlog, 
    fetchedAll, 
    fetchAllBlogs
} from "../slices/blogSlice";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import Article from "./Article";
import SideBar from "./SideBar";

import style from "./Blog.module.css";

/** Blog detail view */
function BlogDetail(){
    const { slug } = useParams() as { slug: string };
    const fetched = useSelector(fetchedAll);
    const blog = useSelector(getBlog(slug));

    // Check if we've fetched blogs from the server, if not fetch them
    if(!fetched)
        useDispatch()(fetchAllBlogs());

    // If a the blog doesn't exist...
    if(!blog){
        return (
            <div className={ style.articleContainer }>
                <p>Unknown blog '{ slug }'</p>
            </div>
        );
    }

    // Render component
    return (
        <div>
            <Helmet>
                <title>{ blog.title ?? "Unknown" }: vanbommel.ca</title>
                <meta name="description" content={ blog.article.slice(0, 100) ?? "Article" } />
            </Helmet>
            <Article blog={ blog } />
            <SideBar blog={ blog } />
        </div>
    );
}

export default BlogDetail;