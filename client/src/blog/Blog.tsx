/*
 * File: Blog.tsx
 * Created: Saturday March 27th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Sunday March 28th 2021 1:30pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from "react";
import style from "./Blog.module.css";

import { useSelector } from "react-redux";
import { getBlogs, Blog } from "../slices/blogSlice";

function Blog(){
    const blogs = useSelector(getBlogs);
    
    return (
        <div className={ style.content }>
            <Article blog={ blogs[0] } />
            <SideBar blog={ blogs[0] } />
        </div>
    );
}

function SideBar({ blog }: { blog: Blog}){
    return (
        <div className={ style.sidebar }>
            <button className="reverse">☕ { blog.coffee }</button>
            <br/>
            <button className="reverse">👍 { blog.thumbsup }</button>
            <br/>
            <button className="reverse">👏 { blog.clap }</button>
        </div>
    );
}

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

export default Blog;