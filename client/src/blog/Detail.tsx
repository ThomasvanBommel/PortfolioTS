/*
 * File: Detail.tsx
 * Created: Wednesday March 31st 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Wednesday March 31st 2021 5:32pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from "react";
import style from "./Blog.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { getBlogBySlug } from "../slices/blogSlice";
import { loadArticle } from "../slices/articleSlice";

import SideBar from "./SideBar";
import Article from "./Article";

function Detail(){
    const dispatch = useDispatch();

    const { slug } = useParams() as { slug: string };
    // const blog = useSelector(getBlogBySlug(slug));
    const article = dispatch(loadArticle(slug));

    // console.log("blog", blog);

    if(!article)
        return (<div className={ style.articleContainer }>
            <h1>Searching for article "{ slug }"...</h1>
        </div>);

    return (
        <div>
            { JSON.stringify(article) }
            {/* <Article blog={ blog } />
            <SideBar blog={ blog } /> */}
        </div>
    );
}

export default Detail;