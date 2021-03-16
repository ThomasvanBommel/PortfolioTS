/*
 * File: App.tsx
 * Created: Saturday February 6th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Monday March 15th 2021 10:12pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-15 7:39pm	TvB	Refactored to use a function component
 * 2021-03-13 7:27pm	TvB	Added contact click callback
 * 2021-03-13 2:54pm	TvB	Updated header + Change import location
 */

import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import YoutubeCarousel from './youtube/YoutubeCarousel';
import ContactForm from './contact/ContactForm';

export enum Page {
    Home, Contact
};

function App(){
    const [ activePage, setActivePage ] = useState(Page.Home);

    // Temporary until navbar is refactored
    const handleContactClick = () => {
        setActivePage(activePage === Page.Home ? Page.Contact : Page.Home);
    };

    return (
        <div>
            <Navbar brand="Thomas vanBommel" contactClick={ handleContactClick } />
            {
                activePage === Page.Home ? (
                    <YoutubeCarousel />
                ) : (
                    <ContactForm />
                )
            }
        </div>
    );
}

export default App;