/*
 * Filename: client/src/Carousel
 * Created Date: Monday, February 15th 2021, 11:10:29 pm
 * Author: Thomas vanBommel
 * 
 */

import React from 'react';
import style from "./Carousel.module.css"

class Carousel extends React.Component {
    selected: number = 0;

    /** Create a new carousel */
    constructor(props: { children: React.ReactNode }) {
        super(props);
    }

    /** Successfully mounted component */
    componentDidMount() {

    }

    back() {
        console.log("back");
        console.log(this.props.children[0]);

        this.incrementSelected(-1);
    }

    forward() {
        console.log("forward");
        console.log(this.props.children[React.Children.count(this.props.children) - 1]);

        this.incrementSelected(1);
    }

    incrementSelected(amount: number) {
        let tmp = this.selected + amount;

        if(tmp < 0){
            this.selected = React.Children.count(this.props.children) - 1;
        }else{
            this.selected = tmp % (React.Children.count(this.props.children) - 1);
        }

        console.log("selected:", this.selected);
    }

    /** Render this component */
    render() {


        return (
            <div className={ `${ style.carousel } mt-3` }>
                <div className={ `${style.children} row` }>
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