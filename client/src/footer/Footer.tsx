/*
 * File: Footer.tsx
 * Created: Saturday April 17th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday April 20th 2021 4:15pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-04-19	TvB	Updates sitemap link
 */

import React, { useState } from 'react';
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
                <a href="mailto:thomas@vanbommel.ca">thomas@vanbommel.ca</a><br/>
                <br/>
                <a href="/robots.txt" target="_blank">robots.txt</a><br/>
                <a href="/sitemap.xml" target="_blank">site-map</a>
            </div>
        </footer>
    );
}

export default Footer;