/*
 * File: Carousel.tsx
 * Created: Tuesday March 16th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday March 27th 2021 1:57pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-25	TvB	Changed file name
 * 2021-03-18	TvB	Finished carousel2 ? (I hope so)
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getVideos, getCurrentVideoIndex, increment, decrement } from "../slices/videoSlice";
import CarouselItem from "./CarouselItem";
import style from "./Carousel.module.css";

const config = require("../../../common/.client.config.json");

const SIZE = {
    small:  { width: 640,      ratio: 1   },
    medium: { width: 960,      ratio: 1/2 },
    large:  { width: Infinity, ratio: 1/3 }
};

function Carousel(){
    // Get width of the document and calculate the width of each item
    const [ documentWidth, setDocumentWidth ] = useState(document.body.clientWidth);
    const itemWidth = getItemWidth(documentWidth);

    // Listen and response to resize events
    useEffect(() => {
        const resizeEvent = () => setDocumentWidth(document.body.clientWidth);

        window.addEventListener("resize", () => resizeEvent());
        return window.removeEventListener("resize", () => resizeEvent());
    }, []);

    // Redux dispatching + fetching
    const dispatch = useDispatch();
    const currentIndex = useSelector(getCurrentVideoIndex);
    const videos = useSelector(getVideos);

    // Animation stuffs...
    const [ animating, setAnimating ] = useState(true);
    const offset = currentIndex * itemWidth;
    const perPage = Math.floor(documentWidth / itemWidth);

    // Animate videos
    useEffect(() => {
        if(animating){
            const interval = setInterval(handleClickForward, 3000);
            return () => clearInterval(interval);
        }
    }, [ animating ]);

    function handleClickForward(){
        dispatch(increment());
    }

    function handleClickBack(){
        dispatch(decrement());
    }

    // Render carousel
    return (
        <div>
            <div className={ style.carousel } 
                 onMouseEnter={ () => setAnimating(false) } 
                 onMouseLeave={ () => setAnimating(true) }>

                <div className={ style.itemContainer } style={{ transform: `translateX(${ -offset }px)` }}>{
                    videos.map(video => <CarouselItem width={ itemWidth } video={ video } />)
                }</div>

                <button className={ style.backButton } onClick={ handleClickBack }>&lt;</button>
                <button className={ style.forwardButton } onClick={ handleClickForward }>&gt;</button>
            </div>
            <div className={ style.info }>
                <p>dwidth={ documentWidth }</p>
                <p>iwidth={ itemWidth }</p>
                <p>perpge={ perPage }</p>
                <p>anmate={ String(animating) }</p>
                <p>active={ currentIndex + 1 } of { videos.length - perPage + 1 }</p>
                <p>offset={ offset }</p>
            </div>
        </div>
    );
}

/** Calculate video width (carousel item) */
function getItemWidth(containerWidth: number){
    for(let [ key, { width, ratio } ] of Object.entries(SIZE))
        if(containerWidth < width)
            return containerWidth * ratio;
    
    return 0;
}

export default Carousel;