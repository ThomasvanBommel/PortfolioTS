/*
 * Filename: client/src/Youtube.tsx
 * Created Date: Sunday, February 14th 2021, 2:23:45 pm
 * Author: Thomas vanBommel
 * 
 */

import { Video } from "../../common/types";
import React from 'react';

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

    render() {

        // check if videos are loaded
        if(!this.state.isLoaded){
            return ( <h1>Loading...</h1> );
        }else{
            return (
                <div>
                    {
                        Object.values(this.state.videos).map(video => (
                            <div>
                                <h3>{ video.title }</h3>
                                <img src={ video.thumbnails["medium"].url } />
                            </div>
                        ))
                    }
                </div>
            );
        }
    }
}

export default Youtube;