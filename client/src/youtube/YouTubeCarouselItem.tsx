/*
 * File: YouTubeCarouselItem.tsx
 * Created: Saturday March 13th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday March 13th 2021 6:53pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from 'react';
import { YouTubeVideo } from "../../../common/types";
import style from "./YouTubeCarousel.module.css";

class YouTubeCarouselItem extends React.Component<{ video: YouTubeVideo }, {}> {

    /** Render this component */
    render() {
        const thumbnailUrl = this.props.video.snippet.thumbnails["medium"].url;

        return (
            <div className={ style.carouselItem }>
                <img src={ thumbnailUrl } alt="Video thumbnail" />

                <p>{ this.props.video.snippet.title }</p>         
            </div>
        );
    }
}

export default YouTubeCarouselItem;