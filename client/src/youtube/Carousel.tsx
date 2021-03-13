/*
 * File: Carousel.tsx
 * Created: Monday February 15th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday March 13th 2021 2:50pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-13 2:39pm	TvB	Added resize timer, 1s after resizing update offset
 * 2021-03-13 1:11pm	TvB	Added comments
 * 2021-03-13 12:11pm	TvB	Bound methods bind(this)
 * 2021-03-13 12:10pm	TvB	Updated header + CSS
 */

import React from 'react';
import style from "./YouTubeCarousel.module.css";

class Carousel extends React.Component<{}, { children_offset: number }> {
    interval_id = 0;
    selected: number = 0;

    resizeTimer: number = -1;

    /** Create a new carousel */
    constructor(props: { children: React.ReactNode }) {
        super(props);

        this.state = { children_offset: 0 };
        this.startAnimation = this.startAnimation.bind(this);
        this.stopAnimation  = this.stopAnimation.bind(this);
        this.forward = this.forward.bind(this);
        this.back = this.back.bind(this);

        this.updateOffset = this.updateOffset.bind(this);
        this.resizeCheck = this.resizeCheck.bind(this);
        this.resize = this.resize.bind(this);
    }

    /** Successfully mounted component */
    componentDidMount() {
        this.startAnimation();
        window.addEventListener('resize', this.resize);
    }

    /** Start window resizing, time it (so we dont update every frame) */
    resize() {
        if(this.resizeTimer < 0){
            this.resizeTimer = Date.now();
            
            this.resizeCheck();

            console.log("resizing...");
        }else{
            this.resizeTimer = Date.now();
        }
    }

    /** Check that the user has stopped resizing for at least a second */
    resizeCheck() {
        if(Date.now() - this.resizeTimer > 1000){
            console.log("finished resizing!")

            this.updateOffset();
            this.resizeTimer = -1;
            return false;
        }

        setTimeout(this.resizeCheck, 200);
    }

    /** Update carousels offset (after resizing) */
    updateOffset() {
        let element_width = this.getItemWidth();
        let offset = this.state.children_offset;

        // this.setState({
        //     children_offset: offset - (offset % element_width)
        // });

        this.setState({
            children_offset: this.selected * -element_width
        });

        console.log("updated carousel offset!")
    }

    /** Start auto scrolling */
    startAnimation() {
        this.interval_id = Number(setInterval(this.forward, 3000));
    }

    /** Stop auto scrolling */
    stopAnimation() {
        clearInterval(this.interval_id);
        this.interval_id = 0;
    }

    /** Scroll left (back) */
    back() {
        let element_width = this.getItemWidth();
        let children_count = React.Children.count(this.props.children) - 1;
        let offset = this.state.children_offset;

        if(this.state.children_offset > 0){
            offset = -element_width * children_count;
        }else{
            offset = this.state.children_offset + element_width;
        }

        this.setState({
            children_offset: offset
        });

        this.incrementSelected(-1);
    }

    /** Scroll right (forward) */
    forward() {
        let element_width = this.getItemWidth();
        let children_count = React.Children.count(this.props.children) - 1;
        let offset = this.state.children_offset;

        if(this.state.children_offset <= -element_width * children_count){
            offset = 0;
        }else{
            offset = this.state.children_offset - element_width;
        }

        this.setState({
            children_offset: offset
        });

        this.incrementSelected(1);
    }

    getItemWidth(){
        return document.querySelector(`.${style.carouselItem}`).clientWidth;
    }

    /** 
     * Increment the counter (which element is selected) 
     * @param { number } amount - Positive or negitive amount to move the counter / selector
     */
    incrementSelected(amount: number) {
        let tmp = this.selected + amount;

        if(tmp < 0){
            this.selected = React.Children.count(this.props.children) - 1;
            return;
        }
            
        this.selected = tmp % (React.Children.count(this.props.children) - 1);
    }

    /** Render this component */
    render() {
        return (
            <div className={ style.carousel } 
                 onMouseEnter={ this.stopAnimation }
                 onMouseLeave={ this.startAnimation }>

                <div className={ style.children } 
                    style={{ transform: `translateX(${ this.state.children_offset }px)` }}>
                    { this.props.children }
                </div>

                <button className={ style.backButton } onClick={ this.back }>
                    &#12296; 
                </button>

                <button className={ style.forwardButton } onClick={ this.forward }>
                    &#12297; 
                </button>
            </div>
        );
    }
}

export default Carousel;