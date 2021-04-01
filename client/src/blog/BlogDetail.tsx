/*
 * File: Detail.tsx
 * Created: Wednesday March 31st 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday April 1st 2021 1:09pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-31	TvB	Updated to work with blogSlice 2.0
 */

import { 
    getBlog, 
    fetchedAll, 
    fetchAllBlogs, 
    incrementEmojiCount 
} from "../slices/blogSlice";
import React from "react";
import style from "./Blog.module.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Blog, Emoji } from "../../../common/types";

/** Blog detail view */
function BlogDetail(){
    const { slug } = useParams() as { slug: string };
    const fetched = useSelector(fetchedAll);
    const blog = useSelector(getBlog(slug));

    // Check if we've fetched blogs from the server, if not fetch them
    if(!fetched)
        useDispatch()(fetchAllBlogs());

    // If a the blog doesn't exist...
    if(!blog)
        return (<div className={ style.articleContainer }>
            <p>Unknown blog '{ slug }'</p>
        </div>);

    // Render component
    return (
        <div>
            <Article blog={ blog } />
            <SideBar blog={ blog } />
        </div>
    );
}

/** Article component */
function Article({ blog }: { blog: Blog}){
    return (
        <div className={ style.articleContainer }>
            <h1 className={ style.title }>
                { blog.title }
            </h1>

            <article className={ style.article }>
                <p>{ blog.article }</p>
            </article>
        </div>
    );
}

/** Sidebar component (user interaction) */
function SideBar({ blog }: { blog: Blog}){
    const dispatch = useDispatch();

    const handleEmojiClick = (emoji: Emoji) => 
        dispatch(incrementEmojiCount({ slug: blog.slug, emoji: emoji }));

    return (
        <div className={ style.sidebar }>
            <button onClick={ () => handleEmojiClick("coffee") }>
                ☕ { blog.coffee }
            </button>
            <br/>
            <button onClick={ () => handleEmojiClick("thumbsup") }>
                👍 { blog.thumbsup }
            </button>
            <br/>
            <button onClick={ () => handleEmojiClick("clap") }>
                👏 { blog.clap }
            </button>
        </div>
    );
}

export default BlogDetail;