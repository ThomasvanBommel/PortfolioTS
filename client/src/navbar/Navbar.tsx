/*
 * File: Navbar.tsx
 * Created: Sunday February 14th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday March 13th 2021 9:54pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-13 7:27pm	TvB	Added click callback + contactPageActive state
 */

import React from 'react';
import Clock from "./Clock";
import style from "./Navbar.module.css";

type properties = {
    brand: string, 
    contactClick: () => void
};

class NavBar extends React.Component<properties, { contactPageActive: boolean }> {

    /** Create a new navigation bar component */
    constructor(props: properties) {
        super(props);

        this.state = {
            contactPageActive: false
        };

        this.clickedContact = this.clickedContact.bind(this);
    }

    clickedContact() {
        this.setState({
            contactPageActive: !this.state.contactPageActive
        });

        this.props.contactClick();
    }

    /** Render to the canvas */
    render() {
        return (
            <nav className={ style.nav }>
                <div>
                    <a href="/">
                        Thomas v<span>an</span>B<span>ommel</span>
                    </a>

                    <div className={ style.spacer }></div>

                    <button type="button" onClick={ this.clickedContact }>
                        { this.state.contactPageActive ? "Home" : "Contact" }
                    </button>
                </div>
            </nav>
        );
    }
}

export default NavBar;