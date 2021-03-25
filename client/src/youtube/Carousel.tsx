/*
 * File: Carousel.tsx
 * Created: Tuesday March 16th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday March 25th 2021 8:18pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-25	TvB	Changed file name
 * 2021-03-18	TvB	Finished carousel2 ? (I hope so)
 */

import { useDispatch, useSelector, useStore } from "react-redux";
import { getVideos, getCurrentVideoIndex, increment, decrement } from "../slices/videoSlice";
import React, { useState, useEffect } from 'react';
import { YouTubeVideo } from "../../../common/types";
import CarouselItem from "./CarouselItem";
import style from "./Carousel.module.css";

const config = require("../../../common/.client.config.json");

const SIZE = {
    small:  { width: 640,      ratio: 1   },
    medium: { width: 960,      ratio: 1/2 },
    large:  { width: Infinity, ratio: 1/3 }
};

// let activeItemStatic = 0;

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

    // Video array and whether or not it's loaded
    // const [ videos, setVideos ] = useState([] as YouTubeVideo[]);
    const dispatch = useDispatch();
    const currentIndex = useSelector(getCurrentVideoIndex);
    const videos = useSelector(getVideos);

    // const [ isLoaded, setIsLoaded] = useState(true);


    // Load videos
    // (async () => {
        // setVideos(await getVideos());
        // setIsLoaded(true);
    // })();

    // Animation stuffs...
    const defaultMovement = 1;
    const [ movement, setMovement ] = useState(defaultMovement);
    // const [ activeItem, setActiveItem ] = useState(activeItemStatic);
    const offset = currentIndex * itemWidth;
    const perPage = Math.floor(documentWidth / itemWidth);

    // activeItemStatic = activeItem;

    // Animate videos
    // useEffect(() => {
    //     if(isLoaded){
    //         const interval = setInterval(() => move(movement), 3000);
    //         return () => clearInterval(interval);
    //     }
    // }, [ isLoaded, movement ]);

    // Move carousel + = forwards, - = backwards
    // function move(n: number) {
    //     if(currentIndex + n < 0){
    //         setActiveItem(videos.length - perPage);
    //     }else{
    //         setActiveItem(x => Math.max((x + n) % (videos.length - perPage + 1), 0));
    //     }
    // }

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
                 onMouseEnter={ () => setMovement(0) } 
                 onMouseLeave={ () => setMovement(defaultMovement) }>

                <div className={ style.itemContainer } style={{ transform: `translateX(${ -offset }px)` }}>{
                    // isLoaded ? (
                        videos.map(video => <CarouselItem width={ itemWidth } video={ video } />)
                    // ) : (
                    //     <p>Loading...</p>
                    // )
                }</div>

                <button className={ style.backButton } onClick={ handleClickBack }>&lt;</button>
                <button className={ style.forwardButton } onClick={ handleClickForward }>&gt;</button>
            </div>
            <div className={ style.info }>
                {/* <p>loaded={ String(isLoaded)}</p> */}
                <p>dwidth={ documentWidth }</p>
                <p>iwidth={ itemWidth }</p>
                <p>perpge={ perPage }</p>
                <p>movent={ movement }</p>
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

let videoCache: YouTubeVideo[] = [];

/** Get and cache videos (to remove unessessary network calls) */
// async function getVideos(): Promise<YouTubeVideo[]>{
//     if(videoCache.length === 0)
//         videoCache = await (await fetch(`http://${config.host}:${config.port}/youtube`)).json();

//     return Promise.resolve(videoCache);
// }

export default Carousel;