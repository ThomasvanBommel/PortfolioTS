/*
 * File: Navbar.tsx
 * Created: Sunday February 14th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Monday March 29th 2021 5:28pm
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

import { Link, NavLink } from "react-router-dom";

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
    function navButton(target: string){
        return (
            <NavLink to={ target }>
                {/* <button type="button"> */}
                        {/* id={ page === target ? style.active : "" }>*/}
                        {/* onClick={ () => handleChange(target) }> */}
                    { String(target) }
                {/* </button> */}
            </NavLink>
        );
    }

    // Render
    return (
        <nav className={ style.nav }>
            <div>
                {/* <a href="#" onClick={ () => handleChange(Page.Home) }> */}
                <Link to="/">
                    Thomas v<span>an</span>B<span>ommel</span>
                </Link>
                {/* </a> */}

                <div className={ style.spacer }></div>

                { navButton("/blog") }
                { navButton("/contact") }
                
            </div>
        </nav>
    );
}

export default NavBar;