/*
 * File: Article.tsx
 * Created: Monday March 29th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Wednesday March 31st 2021 11:31pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-31	TvB	DEPRECATED
 */

import React from "react";
import style from "./Blog.module.css";
import { Blog } from "../slices/blogSlice";

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