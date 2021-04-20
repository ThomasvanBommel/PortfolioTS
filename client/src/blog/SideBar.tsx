/*
 * File: SideBar.tsx
 * Created: Tuesday April 20th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday April 20th 2021 11:10am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from "react";
import { useDispatch } from "react-redux";

import { incrementEmojiCount } from "../slices/blogSlice";
import { Blog, Emoji } from "../../../common/types";

import style from "./Blog.module.css";

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

export default SideBar;