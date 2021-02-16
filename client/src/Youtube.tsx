/*
 * Filename: client/src/Youtube.tsx
 * Created Date: Sunday, February 14th 2021, 2:23:45 pm
 * Author: Thomas vanBommel
 * 
 */

import { Video } from "../../common/types";
import React from 'react';
import Carousel from "./Carousel";

type State = {
    error: Error,
    isLoaded: boolean,
    videos: { [id: string]: Video },
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
        fetch("http://localhost:8000/youtube")
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    videos: result
                });

                console.log(result);
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
                            Object.values(this.state.videos).map((video, i) => (
                                <div key={ i } className="col-lg-4 col-sm-6 col-xs-12 text-center">
                                    <img src={ video.thumbnails["medium"].url } className="d-block mx-auto" />
                                    <h3>{ video.title }</h3>
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