/*
 * File: index.ts
 * Created: Friday March 19th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday March 27th 2021 12:17am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import "./Carousel.test";
// import { JSDOM } from "jsdom";
const { JSDOM } = require("jsdom");

const dom = new JSDOM("", {
    url: "http://vanbommel.ca"
});

console.log(dom.window.location.href);