/*
 * File: Carousel2.tsx
 * Created: Tuesday March 16th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday March 16th 2021 3:22am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React, { useState, useEffect } from 'react';
import style from "./Carousel.module.css";
import { YouTubeVideo } from "../../../common/types";

const config = require("../../../server/build/config/.config.json");

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

    // Video array and whether or not it's loaded
    const [ videos, setVideos ] = useState([] as YouTubeVideo[]);
    const [ isLoaded, setIsLoaded] = useState(false);

    // Load videos
    (async () => {
        setVideos(await getVideos());
        setIsLoaded(true);
    })();

    const [ activeItem, setActiveItem ] = useState(0);
    const offset = activeItem * itemWidth;

    useEffect(() => {
        if(isLoaded){
            const interval = setInterval(() => setActiveItem(x => ++x % videos.length), 3000);
            return () => clearInterval(interval);
        }
    }, [ isLoaded ]);

    return (
        <div>
            <p>doc={ documentWidth } : item={ itemWidth } : loaded={ String(isLoaded)}</p>
            <p>active={ activeItem } : offset={ offset }</p>
            <div className={ style.carousel }>
                <div className={ style.itemContainer } style={{ transform: `translateX(${ -offset }px)` }}>{
                    isLoaded ? (
                        videos.map(video => <Item width={ itemWidth } video={ video } />)
                    ) : (
                        <p>Loading...</p>
                    )
                }</div>
            </div>
        </div>
    );
}

function Item({ width, video }: { width: number, video: YouTubeVideo }){
    return (
        <div key={ video.id } className={ style.item } style={{ width: width }}>
            <img src={ video.snippet.thumbnails["medium"].url } alt="Video thumbnail"/>
        </div>
    );
}

function getItemWidth(containerWidth: number){
    for(let [ key, { width, ratio } ] of Object.entries(SIZE))
        if(containerWidth < width)
            return containerWidth * ratio;
}

let videoCache: YouTubeVideo[] = [];

async function getVideos(): Promise<YouTubeVideo[]>{
    if(videoCache.length === 0)
        videoCache = await (await fetch(`http://${config.host}:${config.port}/youtube`)).json();

    return Promise.resolve(videoCache);
}

export default Carousel;