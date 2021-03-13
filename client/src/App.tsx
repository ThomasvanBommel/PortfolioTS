/*
 * File: App.tsx
 * Created: Saturday February 6th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday March 13th 2021 5:44pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-13 2:54pm	TvB	Updated header + Change import location
 */

import React from 'react';
import Navbar from './Navbar';
import YoutubeCarousel from './youtube/YoutubeCarousel';
import ContactForm from './contact/ContactForm';

class App extends React.Component {

    /** Create a new application */
    constructor(props: {}) {
        super(props);
    }

    /** Render application */
    render() {
        return (
            <div>
                <Navbar brand="Thomas vanBommel" />
                <YoutubeCarousel />
                <ContactForm />
            </div>
        );
    }
}

export default App;