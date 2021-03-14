/*
 * File: Carousel.tsx
 * Created: Monday February 15th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday March 13th 2021 11:34pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-13 10:34pm	TvB	Removed bootstrap + added slide identifier + static values
 * 2021-03-13 5:26pm	TvB	Cleaned up back/forward code
 * 2021-03-13 5:05pm	TvB	Made it calculate items width only 1 time
 * 2021-03-13 2:39pm	TvB	Added resize timer, 1s after resizing update offset
 * 2021-03-13 1:11pm	TvB	Added comments
 * 2021-03-13 12:11pm	TvB	Bound methods bind(this)
 * 2021-03-13 12:10pm	TvB	Updated header + CSS
 */

import React from 'react';
import style from "./YouTubeCarousel.module.css";

let staticSelected = 0;
let staticOffset = 0;
let staticItemWidth = 0;

class Carousel extends React.Component<{}, { children_offset: number }> {
    interval_id = 0;
    selected: number = 0;

    resizeTimer: number = -1;
    itemWidth: number = 0;

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

        this.getChildCount = this.getChildCount.bind(this);  
    }

    /** Successfully mounted component */
    componentDidMount() {
        this.startAnimation();
        this.resizeCheck();
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
        if(Date.now() - this.resizeTimer > 500){
            this.updateOffset();
            this.resizeTimer = -1;

            staticItemWidth = document.getElementsByClassName(style.carouselItem)[1].clientWidth;

            return false;
        }

        setTimeout(this.resizeCheck, 100);
    }

    /** Update carousels offset (after resizing) */
    updateOffset() {
        staticOffset = staticSelected * -staticItemWidth;

        this.setState({
            children_offset: staticOffset
        });
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
        staticSelected = 
            Math.abs(staticSelected + amount) % this.getChildCount();
    }

    getChildCount() {
        return React.Children.count(this.props.children) - 1;
    }

    /** Render this component */
    render() {
        let childCount = this.getChildCount();

        return (
            <div className={ style.carousel } 
                 onMouseEnter={ this.stopAnimation }
                 onMouseLeave={ this.startAnimation }>

                <style>{
                    `.${ style.children } div:nth-child(${ staticSelected +1 }){
                        border: 0.5rem solid #abb;
                        box-sizing: border-box;
                    }`
                }</style>

                <div style={{ overflow: "hidden" }}>
                    <div className={ style.children } 
                        style={{ transform: `translateX(${ staticOffset }px)` }}>
                        { this.props.children }
                    </div>
                </div>

                <button className={ style.backButton } onClick={ this.back }>
                    &#12296; 
                </button>

                <button className={ style.forwardButton } onClick={ this.forward }>
                    &#12297; 
                </button>

                <p id={ style.pageCount }>
                    { staticSelected + 1 } of { childCount + 1 }
                </p>
            </div>
        );
    }
}

export default Carousel;