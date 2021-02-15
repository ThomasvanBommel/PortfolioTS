/*
 * Filename: client/src/index.tsx
 * Created Date: Saturday, February 6th 2021, 11:48:26 pm
 * Author: Thomas vanBommel
 * 
 */

import ReactDOM from 'react-dom';
import React from 'react';

import App from "./App";

window.onload = () => {
    ReactDOM.render(<App />, document.getElementById("root"));

    console.log("Trying to render...");
};