/*
 * File: SideBar.tsx
 * Created: Monday March 29th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Monday March 29th 2021 5:58pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from "react";
import style from "./Blog.module.css";
import { Blog } from "../slices/blogSlice";

/** SideBar for reader interactions */
function SideBar({ blog }: { blog: Blog}){
    return (
        <div className={ style.sidebar }>
            <button>☕ { blog.coffee }</button>
            <br/>
            <button>👍 { blog.thumbsup }</button>
            <br/>
            <button>👏 { blog.clap }</button>
        </div>
    );
}

export default SideBar;