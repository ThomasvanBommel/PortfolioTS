/*
 * Filename: client/src/Youtube.tsx
 * Created Date: Sunday, February 14th 2021, 2:23:45 pm
 * Author: Thomas vanBommel
 * 
 */

import { Video } from "../../common/types";
import Slider from "react-slick";
import React, { createRef } from 'react';

type State = {
    error: Error,
    isLoaded: boolean,
    videos: { [id: string]: Video },

    carousel1: React.RefObject<Slider> | undefined,
    carousel2: React.RefObject<Slider> | undefined
};

class Youtube extends React.Component<{}, State> {
    slider1: React.RefObject<Slider>; 
    slider2: React.RefObject<Slider>; 

    /** Create a Youtube component */
    constructor(props: {}) {
        super(props);

        this.slider1 = createRef();

        this.state = {
            error: null,
            isLoaded: false,
            videos: {},

            carousel1: undefined,
            carousel2: undefined
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

        this.setState({
            carousel1: this.slider1,
            carousel2: this.slider2
        });
    }

    render() {
        let settings1 = {
            infinite: true,
            speed: 500,
            centerMode: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplaySpeed: 5000,
            autoplay: true,
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        };

        let settings2 = {
            ...settings1,
            dots: true,
            slidesToShow: 1,
            autoplay: false,
            responsive: []
        };

        // let videos = this.state.videos;

        
        // if(!this.state.isLoaded){
        //     return ( <h1>Loading...</h1> );
        // }else{
            return (
                <div>
                    <Slider { ...settings1 } 
                        ref={ slider => (this.slider1 = slider) } 
                        asNavFor={ this.state.carousel2 }
                        className="top-slider">
                        {
                            Object.values(this.state.videos).slice(0, 7).map(video => (
                                <div key="top-{ i }" >
                                    <img src={ video.thumbnails["medium"].url } 
                                        className="d-block mx-auto" 
                                        style={{ margin: "16px", maxWidth: "calc(100% - 32px)" }} />
                                </div>
                            ))
                        }
                    </Slider>
                    <Slider { ...settings2 } 
                        ref={ slider => {
                            this.slider2 = slider;
                        } } 
                        asNavFor={ this.state.carousel1 } 
                        className="slider2">
                        {
                            Object.values(this.state.videos).slice(0, 7).map((video, i) => (
                                <div key="bot-{ i }">
                                    <h3>{ video.title }</h3>
                                    <p>{ video.description }</p>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
            );
        // }
    }
}

export default Youtube;