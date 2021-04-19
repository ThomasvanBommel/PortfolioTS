/*
 * File: Footer.tsx
 * Created: Saturday April 17th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Monday April 19th 2021 8:23pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from 'react';
import style from "./Footer.module.css";

function Footer(){
    return (
        <footer className={ style.footer }>
            <span className={ style.left }>&copy; Thomas vanBommel</span>
            <a href="/sitemap.xml" className={ style.right }>site-map</a>
        </footer>
    );
}

export default Footer;