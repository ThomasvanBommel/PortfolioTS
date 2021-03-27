/*
 * File: Blog.tsx
 * Created: Saturday March 27th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday March 27th 2021 3:58pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from "react";
import style from "./Blog.module.css";

function Blog(){

    
    return (
        <div className={ style.content }>
            <SideBar />
            <Article />
        </div>
    );
}

function SideBar(){
    return (
        <div className={ style.sidebar }>
            <button className="reverse">☕ 11</button>
            <br/>
            <button className="reverse">👍 21</button>
            <br/>
            <button className="reverse">👏 2</button>
        </div>
    );
}

function Article(){
    return (
        <div className={ style.articleContainer }>
            <h1 className={ style.title }>
                Wow! Look what I did. So amazing!
            </h1>

            <article className={ style.article }>
                <p>Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. </p>
                <p>Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. </p>
                <p>Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. </p>
                <p>Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. </p>
                <p>Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. </p>
                <p>Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. </p>
                <p>Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. </p>
                <p>Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. </p>
                <p>Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. </p>
                <p>Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. </p>
                <p>Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. </p>
                <p>Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. </p>
                <p>Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. </p>
                <p>Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. </p>
                <p>Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. </p>
                <p>Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. </p>
                <p>Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. </p>
                <p>Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. Hello this is my article. </p>
            </article>
        </div>
    );
}

export default Blog;