/*
 * File: SideBar.tsx
 * Created: Tuesday April 20th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Wednesday April 21st 2021 10:33am
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
                <img src="/coffee.png" alt="coffee"/>
                &nbsp;{ blog.coffee }
            </button>
            <br/>
            <button onClick={ () => handleEmojiClick("thumbsup") }>
                <img src="/thumbsup.png" alt="thumbs up"/>
                &nbsp;{ blog.thumbsup }
            </button>
            <br/>
            <button onClick={ () => handleEmojiClick("clap") }>
                <img src="/clap.png" alt="clap"/>
                &nbsp;{ blog.clap }
            </button>
        </div>
    );
}

export default SideBar;