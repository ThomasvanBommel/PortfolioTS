/*
 * File: Blog.tsx
 * Created: Saturday March 27th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Monday March 29th 2021 9:38pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from "react";
import style from "./Blog.module.css";

import { useSelector, useDispatch } from "react-redux";
import { getBlogs, Blog, isLoaded } from "../slices/blogSlice";
import { fetchBlogs } from '../slices/blogSlice';

import { useRouteMatch, Link, Switch, Route } from "react-router-dom";

import SideBar from "./SideBar";
import Article from "./Article";

function Blog(){
    if(!useSelector(isLoaded))
        useDispatch()(fetchBlogs);

    const { path } = useRouteMatch();
    
    return (
        <div className={ style.content }>
            <Switch>
                <Route path={ `${ path }/:slug` }>

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
    const loaded = useSelector(isLoaded);
    const { url } = useRouteMatch();

    return (
        <div className={ style.articleContainer }>
            <h1>Blogs:</h1>
            <div className={ style.blogListContainer }>
                {
                    blogs.length < 1 ? (
                        <div>
                            {
                                loaded ? "No blogs..." : "Loading"
                            }
                        </div>
                    ) : (
                        <ul>
                            {
                                blogs.map((blog, i) => (
                                    <li key={ blog.title }>
                                        <Link to={ `${ url }/${ i }` }>
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

function Detail({ blog }: { blog: Blog}){
    return (
        <div>
            <Article blog={ blog } />
            <SideBar blog={ blog } />
        </div>
    );
}

export default Blog;