/*
 * File: Navbar.tsx
 * Created: Sunday February 14th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday March 25th 2021 5:56pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-25	TvB	Cleaned up comments
 * 2021-03-24	TvB	Added support for redux store
 * 2021-03-16	TvB	Refactor to use react function components
 * 2021-03-15	TvB	Updated change-log format
 * 2021-03-13	TvB	Added click callback + contactPageActive state
 */

import React from 'react';
import style from "./Navbar.module.css";

import { useDispatch, useSelector, useStore } from "react-redux";
import { getPage, setPage, Page } from "../pageReducer";

function NavBar(){
    const page = useSelector(getPage);
    const disbatch = useDispatch();

    // Handle page change button click
    function handleClick(){
        let nextPage: Page;

        if(page === Page.Contact){
            nextPage = Page.Home;
        }else{
            nextPage = Page.Contact;
        }

        // Set page
        disbatch({ ...setPage(), payload: nextPage });
    }

    // Render navbar
    return (
        <nav className={ style.nav }>
            <div>
                <a href="/">Thomas v<span>an</span>B<span>ommel</span></a>

                <div className={ style.spacer }></div>

                <button type="button" onClick={ handleClick }>
                    { page === Page.Contact ? "Home" : "Contact" }
                </button>
            </div>
        </nav>
    );
}

export default NavBar;