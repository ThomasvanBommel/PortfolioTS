/*
 * File: Navbar.tsx
 * Created: Sunday February 14th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday March 16th 2021 12:41am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-16	TvB	Refactor to use react function components
 * 2021-03-15	TvB	Updated change-log format
 * 2021-03-13	TvB	Added click callback + contactPageActive state
 */

import React from 'react';
import { Page } from '../App';
import style from "./Navbar.module.css";

/** Navbar */
function NavBar({ activePage, setActivePage }
    : { activePage: Page, setActivePage: React.Dispatch<React.SetStateAction<Page>> }){
    
    // Check which page we're on
    const isContactPage = activePage === Page.Contact;
    const prevPage = isContactPage ? Page.Home : activePage;

    // Handle change page button click
    const handleClick = () => {
        if(!isContactPage)
            return setActivePage(Page.Contact);

        setActivePage(prevPage);
    };

    return (
        <nav className={ style.nav }>
            <div>
                <a href="/">Thomas v<span>an</span>B<span>ommel</span></a>

                <div className={ style.spacer }></div>

                <button type="button" onClick={ handleClick }>
                    { isContactPage ? prevPage : "Contact" }
                </button>
            </div>
        </nav>
    );
}

export default NavBar;