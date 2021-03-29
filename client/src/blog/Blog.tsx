/*
 * File: Blog.tsx
 * Created: Saturday March 27th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Monday March 29th 2021 6:40pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from "react";
import style from "./Blog.module.css";

import { useSelector, useDispatch } from "react-redux";
import { getBlogs, Blog, isLoaded } from "../slices/blogSlice";
import { fetchBlogs } from '../slices/blogSlice';

import SideBar from "./SideBar";
import Article from "./Article";

function Blog(){
    if(!useSelector(isLoaded))
        useDispatch()(fetchBlogs);
    
    return (
        <div className={ style.content }>
            <Master />
        </div>
    );
}

function Master(){
    const blogs = useSelector(getBlogs);


    return (
        <div>
            {
                blogs.length < 1 ? (
                    <div>No blogs...</div>
                ) : (
                    blogs.map(blog => (
                        <div key={ blog.title }>{ blog.title }</div>
                    ))
                )
            }
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