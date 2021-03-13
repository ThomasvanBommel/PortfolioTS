/*
 * Filename: client/src/Navbar.tsx
 * Created Date: Sunday, February 7th 2021, 12:46:13 am
 * Author: Thomas vanBommel
 * 
 */

import React from 'react';
import Clock from "./Clock";

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
            <nav className="navbar navbar-expand navbar-light bg-light d-flex border-bottom shadow-sm">
                <a href="/" className="navbar-brand ms-3">
                    { this.props.brand }
                </a>
                <div className="flex-fill"></div>
                <Clock />
                <button type="button" 
                        onClick={ this.clickedContact }
                        className="btn btn-outline-success me-3">
                    { this.state.contactPageActive ? "Home" : "Contact" }
                </button>
            </nav>
        );
    }
}

export default NavBar;