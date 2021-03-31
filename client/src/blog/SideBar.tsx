/*
 * File: SideBar.tsx
 * Created: Monday March 29th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Wednesday March 31st 2021 1:12am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React, { useState, useEffect } from "react";
import style from "./Blog.module.css";
import { useDispatch } from "react-redux";
import { Blog, increment } from "../slices/blogSlice";

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
        dispatch({ ...increment(), payload: { id: blog.id, option: key }});
    }

    function handleMouseDown(key: typeof selected){
        setSelected(key);
        handleIncrement(key);
        setMouseDown(true);
    }

    function handleMouseUp(){
        setMouseDown(false);
    }

    return (
        <div className={ style.sidebar }>
            <button onMouseDown={ () => handleMouseDown("coffee") } 
                    onMouseUp={ handleMouseUp }>
                ☕ { blog.coffee }
            </button>
            <br/>
            <button onMouseDown={ () => handleMouseDown("thumbsup") } 
                    onMouseUp={ handleMouseUp }>
                👍 { blog.thumbsup }
            </button>
            <br/>
            <button onMouseDown={ () => handleMouseDown("clap") } 
                    onMouseUp={ handleMouseUp }>
                👏 { blog.clap }
            </button>
        </div>
    );
}

export default SideBar;