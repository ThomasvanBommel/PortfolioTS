/*
 * File: Footer.tsx
 * Created: Saturday April 17th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday April 22nd 2021 6:43pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-04-19	TvB	Updates sitemap link
 */

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import style from "./Footer.module.css";

function Footer(){
    const [ open, setOpen ] = useState(false);
    const toggleOpen = () => setOpen(opn => !opn);

    return (
        <footer className={ `${ style.footer } ${ open ? style.open : "" }` }>
            <div className={ style.flex }>
                <span className={ style.left }>
                { new Date().getFullYear() } &copy; Thomas vanBommel
                </span>
                <div onClick={ toggleOpen } className={ `${ style.right } ${ style.link }` }>
                    Toggle { open ? <span>&darr;</span> : <span>&uarr;</span> }
                </div>
            </div>
            <div className={ style.info }>
                <br/>
                <div className={ style.flex }>
                    <div className={ style.left }>
                        <div className={ style.centered }>
                            <p>
                                <a href="mailto:thomas@vanbommel.ca">thomas@vanbommel.ca</a>
                            </p>
                            {/* <p>
                                <a href="#" target="_blank">Cover Letter</a>
                            </p> */}
                            <p>
                                <a href="/Resume.pdf" target="_blank">Resume</a>
                            </p>
                        </div>
                    </div>
                    <div className={ style.right }>
                        <div className={ style.centered }>
                            <p>
                                <a href="/robots.txt" target="_blank">robots.txt</a>
                            </p>
                            <p>
                                <a href="/sitemap.xml" target="_blank">site-map</a>
                            </p>
                            <p>
                                <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;