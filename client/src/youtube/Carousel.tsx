/*
 * File: Carousel.tsx
 * Created: Tuesday March 16th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 17th 2021 8:40pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-04-17	TvB	Added embeded video iframe
 * 2021-03-27	TvB	Fixed animation
 * 2021-03-25	TvB	Changed file name
 * 2021-03-18	TvB	Finished carousel2 ? (I hope so)
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { 
    getVideos, 
    increment, 
    decrement, 
    isAnimated, 
    setIsAnimated,
    setCurrentIndex, 
    getCurrentVideoIndex, 
} from "../slices/videoSlice";
import CarouselItem from "./CarouselItem";
import style from "./Carousel.module.css";

const SIZE = {
    small:  { width: 640,      ratio: 1   },
    medium: { width: 960,      ratio: 1/2 },
    large:  { width: Infinity, ratio: 1/3 }
};

function Carousel(){
    // Get width of the document and calculate the width of each item
    const [ documentWidth, setDocumentWidth ] = useState(document.body.clientWidth);
    const itemWidth = getItemWidth(documentWidth);

    // Video slice isAnimated (enable / disable animations)
    const animated = useSelector(isAnimated);

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
    const [ animating, setAnimating ] = useState(true && animated);
    const offset = currentIndex * itemWidth;
    const perPage = Math.floor(documentWidth / itemWidth);

    // Animate videos
    useEffect(() => {
        if(animating){
            const interval = setInterval(handleClickForward, 8000);
            return () => clearInterval(interval);
        }
    }, [ animating ]);

    // Handle clicking (move animation forward)
    function handleClickForward(){
        dispatch(increment());
    }

    // Handle clicking (move animation backwards)
    function handleClickBack(){
        dispatch(decrement());
    }

    // Calculate embeded video size
    const embedSize = Math.min(1000, documentWidth);

    // Handle video click and change the current active video
    function handleItemClick(i: number){
        dispatch(setCurrentIndex(i));
    }

    // Video slice isAnimated (enable / disable animations)
    function toggleIsAnimated(){
        dispatch(setIsAnimated(!animated));
    }

    // Render carousel
    return (
        <div>
            <div onMouseEnter={ () => setAnimating(false) } 
                 onMouseLeave={ () => setAnimating(true && animated) }>
                <div className={ style.embed }>
                    {
                        videos.length < 1 ? "" : (
                            <iframe width={ embedSize } height={ embedSize * 9/16 }
                                src={ `https://www.youtube.com/embed/${ videos[currentIndex].id }` }>
                            </iframe> 
                        )
                    }
                    <div className={ style.animated }>
                        <input type="checkbox" checked={ animated } onClick={ toggleIsAnimated } />
                        &nbsp;Animated&nbsp;
                        <span className={ style.indicator } 
                            style={{ backgroundColor: animating ? "lightgreen" : "red" }}></span>
                    </div>
                </div>
                <div className={ style.carousel }>

                    <div className={ style.itemContainer } style={{ 
                        transform: `translateX(${ -offset }px)`,
                    }}>{
                        videos.map((video, i) => 
                            <CarouselItem width={ itemWidth } 
                                clickHandler={ () => { handleItemClick(i) } }
                                key={ video.id } 
                                video={ video } />
                        )
                    }</div>

                    <button className={ style.backButton } onClick={ handleClickBack }>&lt;</button>
                    <button className={ style.forwardButton } onClick={ handleClickForward }>&gt;</button>
                </div>
            </div>
            <div className={ style.pageDisplay }>
                <span className={ style.skipButton } 
                    onClick={ () => { dispatch(setCurrentIndex(0)) } }>&lt;&lt;</span>
                { currentIndex + 1 } of { videos.length }
                <span className={ style.skipButton } 
                    onClick={ () => { dispatch(setCurrentIndex(videos.length)) } }>&gt;&gt;</span>
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