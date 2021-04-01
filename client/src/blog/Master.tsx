/*
 * File: Master.tsx
 * Created: Wednesday March 31st 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Wednesday March 31st 2021 4:50pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from "react";
import style from "./Blog.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs, Blog, isLoading, fetchBlogList } from "../slices/blogSlice";
import { useRouteMatch, Link } from "react-router-dom";

function Master(){
    const blogs = useSelector(getBlogs);
    const loading = useSelector(isLoading);
    const dispatch = useDispatch();

    if(blogs.length < 1 && !loading)
        dispatch(fetchBlogList);

    return <Design blogs={ blogs } />;
}

function Design({ blogs }: { blogs: Blog[] }){
    // const blogs = useSelector(getBlogs);
    const { url } = useRouteMatch();

    return (
        <div className={ style.articleContainer }>
            <h1>Blogs:</h1>
            <div className={ style.blogListContainer }>
                {
                    blogs.length < 1 ? (
                        <div>
                            {
                                blogs.length < 1 ? "No blogs..." : "Loading..."
                            }
                        </div>
                    ) : (
                        <ul>
                            {
                                blogs.map((blog, i) => (
                                    <li key={ blog.title }>
                                        <Link to={ `${ url }/${ blog.slug }` }>
                                            { blog.title }
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </div>
    );
}

export default Master;