/*
 * File: App.tsx
 * Created: Saturday February 6th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday March 13th 2021 7:12pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-13 2:54pm	TvB	Updated header + Change import location
 */

import React from 'react';
import Navbar from './Navbar';
import YoutubeCarousel from './youtube/YoutubeCarousel';
import ContactForm from './contact/ContactForm';

type stateType = {
    showContactForm: boolean
};

class App extends React.Component<{}, stateType> {

    /** Create a new application */
    constructor(props: {}, state: stateType = { showContactForm: false }) {
        super(props);

        this.state = state;

        this.contactClick = this.contactClick.bind(this);
    }

    contactClick() {
        this.setState({
            showContactForm: !this.state.showContactForm
        });
    }

    /** Render application */
    render() {
        return (
            <div>
                <Navbar brand="Thomas vanBommel" contactClick={ this.contactClick } />
                {
                    this.state.showContactForm ? (
                        <ContactForm />
                    ) : (
                        <YoutubeCarousel />
                    )
                }
            </div>
        );
    }
}

export default App;