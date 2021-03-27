/*
 * File: Navbar.tsx
 * Created: Sunday February 14th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday March 27th 2021 2:59pm
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

import { useDispatch, useSelector } from "react-redux";
import { getPage, setPage, Page } from "../slices/pageSlice";

function NavBar(){
    // Get page and setup dispatch
    const page = useSelector(getPage);
    const disbatch = useDispatch();

    // console.log(new URL(document.location.href).searchParams.get("page"));
    // history.pushState("", "vanBommel: Home", "?page=home");

    // Change page
    function handleChange(target: Page){
        disbatch({ ...setPage(), payload: target });
    }

    // Create button with className and handler
    function navButton(target: Page){
        return (
            <button type="button" 
                    id={ page === target ? style.active : "" } 
                    onClick={ () => handleChange(target) }>
                { String(target) }
            </button>
        );
    }

    // Render
    return (
        <nav className={ style.nav }>
            <div>
                <a href="#" onClick={ () => handleChange(Page.Home) }>
                    Thomas v<span>an</span>B<span>ommel</span>
                </a>

                <div className={ style.spacer }></div>

                { navButton(Page.Blog) }
                { navButton(Page.Contact) }
                
            </div>
        </nav>
    );
}

export default NavBar;