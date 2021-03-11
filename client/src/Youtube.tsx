/*
 * Filename: client/src/Youtube.tsx
 * Created Date: Sunday, February 14th 2021, 2:23:45 pm
 * Author: Thomas vanBommel
 * 
 */

import { YouTubeVideo } from "../../common/types";
import Carousel from "./Carousel";
import React from 'react';

const config = require("../../server/build/config/.config.json");

type State = {
    error: Error,
    isLoaded: boolean,
    videos: { [id: string]: YouTubeVideo },
};

class Youtube extends React.Component<{}, State> {

    /** Create a Youtube component */
    constructor(props: {}) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            videos: {},
        };
    }

    /** Successfully mounted component */
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
            return ( 
                <div>
                    <div className="spinner-border d-block mx-auto my-5 text-secondary"></div>
                </div>
            );
        }else{
            return (
                <div>
                    <Carousel>
                        {
                            Object.values(this.state.videos).map(video => (
                                <div key={ video.id } className="slide col-lg-4 col-sm-6 col-xs-12 text-center">
                                    <img src={ 
                                        video.snippet.thumbnails["medium"].url 
                                    } className="d-block mx-auto" />
                                    <p style={{ 
                                        width: "80%",
                                        display: "block",
                                        margin: "0 auto",
                                        paddingTop: "0.25em",
                                        maxHeight: "1.75em", 
                                        overflow: "hidden", 
                                        textOverflow: "ellipsis", 
                                        whiteSpace: "nowrap" }}>
                                        { video.snippet.title }
                                    </p>
                                </div>
                            ))
                        }
                    </Carousel>
                </div>
            );
        }
    }
}

export default Youtube;