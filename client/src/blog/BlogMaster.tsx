/*
 * File: Master.tsx
 * Created: Wednesday March 31st 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Wednesday March 31st 2021 11:49pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-31	TvB	Updated for use with the new blogSlice
 */

import React from "react";
import style from "./Blog.module.css";
import { useRouteMatch, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { allBlogs, fetchAllBlogs, fetchedAll } from "../slices/blogSlice";

/** Blog 'Master' view (all blog links) */
function BlogMaster(){
    const hasBeenFetched = useSelector(fetchedAll);

    // Check if all blogs have been fetched from the server, if not fetch them
    if(!hasBeenFetched)
        useDispatch()(fetchAllBlogs());
        
    // Render the rest of this component
    return <Design fetched={ hasBeenFetched } />;
}

/** Master views design */
function Design({ fetched }: { fetched: boolean }){
    const blogs = useSelector(allBlogs);
    const { url } = useRouteMatch();

    // Calculate content
    const content = () => {

        // Check if we've fetched all the blogs
        if(!fetched)
            return <div>Loading...</div>;

        // Check that there are some blogs to display
        if(blogs.length < 1)
            return <div>No blogs...</div>

        // Return a list of links to the various blogs
        return (
            <ul>{
                blogs.map((blog) => (
                    <li key={ blog.slug }>
                        <Link to={ `${ url }/${ blog.slug }` }>
                            { blog.title }
                        </Link>
                    </li>
                ))
            }</ul>
        );
    };

    // Return this element
    return (
        <div className={ style.articleContainer }>
            <h1>Blogs:</h1>
            <div className={ style.blogListContainer }>
                { content() }
            </div>
        </div>
    );
}

export default BlogMaster;