/*
 * File: index.ts
 * Created: Friday March 19th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 24th 2021 8:59pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import Carousel from "../src/youtube/Carousel";

describe("Testing...", () => {
    let container: HTMLDivElement; 

    beforeAll(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });
      
    afterAll(() => {
        document.body.removeChild(container);
        container = null;
    });

    test("test", () => {
        // act(() => {
        //     render((
        //         <Provider>
        //             <Carousel />
        //         </Provider>
        //     ), container);
        // });

        // console.log(document);
        expect(1).toBe(1);
    });
});