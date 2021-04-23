/*
 * File: index.ts
 * Created: Friday March 19th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Friday April 23rd 2021 2:43pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from 'react';
import assert from "assert";
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Footer from "../src/footer/Footer";

Enzyme.configure({ adapter: new Adapter() });

// describe("React test...", function() {
//     it("something", function() {
//         const wrapper = shallow(<Footer />);
//         wrapper.find("a").forEach(a => {
//             console.log(a.props());
//         });

//         // done();

//         assert.ok(true);
//     });
// });