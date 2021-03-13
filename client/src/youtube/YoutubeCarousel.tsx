/*
 * File: YoutubeCarousel.tsx
 * Created: Sunday February 14th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday March 13th 2021 2:57pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-13 2:57pm	TvB	Changed file name
 * 2021-03-13 2:52pm	TvB	Moved over to using YouTubeCarouselItem
 * 2021-03-13 12:49pm	TvB	Updated header
 */

import YouTubeCarouselItem from "./YouTubeCarouselItem";
import { YouTubeVideo } from "../../../common/types";
import Carousel from "./Carousel";
import React from 'react';

const config = require("../../../server/build/config/.config.json");

type State = {
    error: Error,
    isLoaded: boolean,
    videos: { [id: string]: YouTubeVideo },
};

class YoutubeCarousel extends React.Component<{}, State> {

    /** Create a Youtube component */
    constructor(props: {}) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            videos: {},
        };
    }

    /** Successfully mounted component, fetch videos */
    componentDidMount() {
        fetch(`http://${ config.host }:${ config.port }/youtube`)
            .then(res => {
                return res.json();
            }).then(result => {
                this.setState({
                    isLoaded: true,
                    videos: result
                });
            }, error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }

    /** Render this component */
    render() {

        // check if videos are loaded
        if(!this.state.isLoaded){

            // return spinner (waiting...)
            return ( 
                <div>
                    <div className="spinner-border d-block mx-auto my-5 text-secondary"></div>
                </div>
            );
        }else{

            // return carousel items
            return (
                <Carousel>{
                    Object.values(this.state.videos).map(video => (
                        <YouTubeCarouselItem key={ video.id } video={ video } />
                    ))
                }</Carousel>
            );
        }
    }
}

export default YoutubeCarousel;