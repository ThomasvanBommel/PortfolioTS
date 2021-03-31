/*
 * File: Blog.tsx
 * Created: Saturday March 27th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday March 30th 2021 11:58pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from "react";
import style from "./Blog.module.css";

import { useSelector, useDispatch } from "react-redux";
import { getBlogs, Blog, isLoaded } from "../slices/blogSlice";
import { fetchBlogs, getBlogBySlug } from '../slices/blogSlice';

import { useRouteMatch, useParams, Link, Switch, Route } from "react-router-dom";

import SideBar from "./SideBar";
import Article from "./Article";

function Blog(){
    if(!useSelector(isLoaded))
        useDispatch()(fetchBlogs);

    return <Router />;
}

function Router(){
    const { path } = useRouteMatch();
    
    return (
        <div className={ style.content }>
            <Switch>
                <Route path={ `${ path }/:slug` }>
                    <Detail />
                </Route>

                <Route path={ path }>
                    <Master />
                </Route>
            </Switch>
        </div>
    );
}

function Master(){
    const blogs = useSelector(getBlogs);
    const { url } = useRouteMatch();

    // console.log("master", blogs);

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

function Detail(){
    const { slug } = useParams() as { slug: string };
    const blog = useSelector(getBlogBySlug(slug));

    // console.log("blog", blog);

    if(!blog)
        return (<div className={ style.articleContainer }>
            <h1>Searching for article "{ slug }"...</h1>
        </div>);

    return (
        <div>
            <Article blog={ blog } />
            <SideBar blog={ blog } />
        </div>
    );
}

export default Blog;