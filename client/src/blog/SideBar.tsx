/*
 * File: SideBar.tsx
 * Created: Monday March 29th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Wednesday March 31st 2021 11:31pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-31	TvB	DEPRECATED
 */

import React, { useState, useEffect } from "react";
import style from "./Blog.module.css";
import { useDispatch } from "react-redux";
import { Blog } from "../slices/blogSlice";

/** SideBar for reader interactions */
function SideBar({ blog }: { blog: Blog}){
    const dispatch = useDispatch();

    const [ mouseDown, setMouseDown ] = useState(false);
    const [ holding, setHolding ] = useState(false);
    const [ selected, setSelected ] = useState("thumbsup" as "coffee" | "thumbsup" | "clap");

    useEffect(() => {
        if(mouseDown){
            const interval = setTimeout(() => {
                setHolding(true);
            }, 500);
    
            return () => clearInterval(interval);
        }else{
            setHolding(false);
        }
    }, [ mouseDown ]);

    useEffect(() => {
        if(holding){
            const interval = setInterval(() => {
                handleIncrement(selected);
            }, 50);

            return () => clearInterval(interval);
        }
        
    }, [ holding ]);

    function handleIncrement(key: typeof selected){
        // dispatch({ ...increment(), payload: { id: blog.id, option: key }});
    }

    function handleMouseDown(key: typeof selected){
        setSelected(key);
        handleIncrement(key);
        setMouseDown(true);
    }

    function handleMouseUp(){
        setMouseDown(false);
    }

    if(!blog.article)
        return (
            <div className={ style.sidebar }>
                :(
            </div>
        );

    return (
        <div className={ style.sidebar }>
            <button onMouseDown={ () => handleMouseDown("coffee") } 
                    onMouseUp={ handleMouseUp }>
                ☕ { blog.article.coffee }
            </button>
            <br/>
            <button onMouseDown={ () => handleMouseDown("thumbsup") } 
                    onMouseUp={ handleMouseUp }>
                👍 { blog.article.thumbsup }
            </button>
            <br/>
            <button onMouseDown={ () => handleMouseDown("clap") } 
                    onMouseUp={ handleMouseUp }>
                👏 { blog.article.clap }
            </button>
        </div>
    );
}

export default SideBar;