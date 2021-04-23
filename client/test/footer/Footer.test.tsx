/*
 * File: Footer.test.tsx
 * Created: Friday April 23rd 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Friday April 23rd 2021 6:56pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from 'react';
// import assert from "assert";
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Footer from "../../src/footer/Footer";

Enzyme.configure({ adapter: new Adapter() });

describe("Footer", function() {

    it("props", function() {
        const wrapper = shallow(<Footer />);
        wrapper.find("a").forEach(a => {
            console.log(a.props());
        });

        // assert.ok(true);
    });
});