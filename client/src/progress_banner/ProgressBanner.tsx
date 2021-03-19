/*
 * File: ProgressBanner.tsx
 * Created: Thursday March 18th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday March 18th 2021 8:57pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from 'react';
import style from "./ProgressBanner.module.css";

function ProgressBanner() {
    return (
        <div className={ style.banner }>
            This website is currently in development and missing some functionality
        </div>
    );
}

export default ProgressBanner;