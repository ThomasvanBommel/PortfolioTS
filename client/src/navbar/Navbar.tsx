/*
 * File: Navbar.tsx
 * Created: Sunday February 14th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Monday March 29th 2021 6:31pm
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
import { Link, NavLink } from "react-router-dom";

function NavBar(){

    // Create button with className and handler
    function navButton(target: string){
        return (
            <NavLink to={ target }>
                { String(target) }
            </NavLink>
        );
    }

    // Render
    return (
        <nav className={ style.nav }>
            <div>
                <Link to="/">
                    Thomas v<span>an</span>B<span>ommel</span>
                </Link>

                <div className={ style.spacer }></div>

                { navButton("/blog") }
                { navButton("/contact") }
                
            </div>
        </nav>
    );
}

export default NavBar;