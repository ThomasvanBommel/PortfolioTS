/*
 * File: Carousel.tsx
 * Created: Monday February 15th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday March 13th 2021 7:18pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-13 5:26pm	TvB	Cleaned up back/forward code
 * 2021-03-13 5:05pm	TvB	Made it calculate items width only 1 time
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
    itemWidth: number = 0;

    lazyElements: HTMLImageElement[] = [];

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

        this.lazyLoad = this.lazyLoad.bind(this);
    }

    /** Successfully mounted component */
    componentDidMount() {
        this.startAnimation();
        this.updateOffset();

        window.addEventListener('resize', this.resize);
    }

    /** Stop animation when unmounted */
    componentWillUnmount() {
        this.stopAnimation();
    }

    /** Start window resizing, time it (so we dont update every frame) */
    resize() {
        if(this.resizeTimer < 0){
            this.resizeTimer = Date.now();
            this.resizeCheck();
        }else{
            this.resizeTimer = Date.now();
        }
    }

    /** Check that the user has stopped resizing for at least a second */
    resizeCheck() {
        if(Date.now() - this.resizeTimer > 1000){
            this.updateOffset();
            this.resizeTimer = -1;
            return false;
        }

        setTimeout(this.resizeCheck, 200);
    }

    /** Update carousels offset (after resizing) */
    updateOffset() {
        this.itemWidth = document.querySelector(`.${style.carouselItem}`).clientWidth;

        this.lazyLoad();

        this.setState({
            children_offset: this.selected * -this.itemWidth
        });
    }

    /** Load images when they are close to the viewport */
    lazyLoad() {

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
        this.moveSelected(-1);
        this.updateOffset();
    }

    /** Scroll right (forward) */
    forward() {
        this.moveSelected(1);
        this.updateOffset();
    }

    /** 
     * Change which item is selected
     * @param { number } amount - Positive to move up or negitive to move down
     */
    moveSelected(amount: number) {
        this.selected = 
            Math.abs(this.selected + amount) % (React.Children.count(this.props.children) - 1);
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