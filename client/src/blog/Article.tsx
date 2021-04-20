/*
 * File: Article.tsx
 * Created: Tuesday April 20th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday April 20th 2021 11:06am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from "react";
import { Blog } from "../../../common/types";

import style from "./Blog.module.css";

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

export default Article;