/*
 * File: CarouselItem.tsx
 * Created: Thursday March 25th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 17th 2021 6:22pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-04-17	TvB	Added clickHandler
 */

import React from 'react';
import { YouTubeVideo } from "../../../common/types";
import style from "./Carousel.module.css";

/** Carousel video item */
export default function CarouselItem({ width, video, clickHandler }
    : { width: number, video: YouTubeVideo, clickHandler: () => void }){

    const thumbnail = video.snippet.thumbnails["medium"];

    return (
        <div key={ video.id } className={ style.item } style={{ width: width }}>
            <div className={ style.videoThumbnail } onClick={ clickHandler }>
                <img src={ thumbnail.url } alt="Video thumbnail"/>
                <table className={ style.videoDetails }
                       style={{ 
                           width: thumbnail.width,
                           left: width / 2 - thumbnail.width / 2
                        }}>
                    <tbody>
                        <tr>
                            <td>👀</td>
                            <td>Views</td>
                            <td>{ video.statistics?.viewCount ?? 0 }</td>
                        </tr>
                        <tr></tr>
                        <tr>
                            <td>👍</td>
                            <td>Likes</td>
                            <td>{ video.statistics?.likeCount ?? 0 }</td>
                        </tr>
                        <tr>
                            <td>👎</td>
                            <td>Dislikes</td>
                            <td>{ video.statistics?.dislikeCount ?? 0 }</td>
                        </tr>
                        <tr>
                            <td>💬</td>
                            <td>Comments</td>
                            <td>{ video.statistics?.commentCount ?? 0 }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className={ style.itemTitle }>
                🔗&nbsp;
                <a href={ `https://www.youtube.com/watch?v=${ video.id }` }>
                    { video.snippet.title }
                </a>
            </p>
        </div>
    );
}