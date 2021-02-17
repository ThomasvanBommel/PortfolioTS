/*
 * Filename: client/src/Carousel
 * Created Date: Monday, February 15th 2021, 11:10:29 pm
 * Author: Thomas vanBommel
 * 
 */

import React from 'react';
import style from "./Carousel.module.css"

class Carousel extends React.Component<{}, { children_offset: number }> {
    interval_id = 0;
    selected: number = 0;

    /** Create a new carousel */
    constructor(props: { children: React.ReactNode }) {
        super(props);

        this.state = { children_offset: 0 };
    }

    /** Successfully mounted component */
    componentDidMount() {
        this.startAnimation();
        window.addEventListener('resize', this.resize.bind(this));
    }

    resize() {
        let element_width = document.querySelector(".slide").clientWidth;
        let offset = this.state.children_offset;

        this.setState({
            children_offset: offset - (offset % element_width)
        });
    }

    startAnimation() {
        this.interval_id = Number(setInterval(this.forward.bind(this), 3000));
    }

    stopAnimation() {
        clearInterval(this.interval_id);
        this.interval_id = 0;
    }

    back() {
        let element_width = document.querySelector(".slide").clientWidth;
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

    forward() {
        let element_width = document.querySelector(".slide").clientWidth;
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
            <div className={ `${ style.carousel } bg-dark text-light` }
                onMouseEnter={ this.stopAnimation.bind(this) }
                onMouseLeave={ this.startAnimation.bind(this) }>

                <div className={ `${ style.children } row` } 
                    style={{ transform: `translateX(${ this.state.children_offset }px)` }}>
                    { this.props.children }
                </div>
                <button className={ `${ style.button } ${ style.back } btn` } onClick={ this.back.bind(this) }>
                    &#12296; 
                </button>
                <button className={ `${ style.button } ${ style.forward } btn` } onClick={ this.forward.bind(this) }>
                    &#12297; 
                </button>
            </div>
        );
    }
}

export default Carousel;