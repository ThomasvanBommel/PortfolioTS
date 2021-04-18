/*
 * File: Footer.tsx
 * Created: Saturday April 17th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 17th 2021 11:35pm
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
            <a href="#" className={ style.right }>site-map</a>
        </footer>
    );
}

export default Footer;