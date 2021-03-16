/*
 * File: App.tsx
 * Created: Saturday February 6th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday March 16th 2021 2:52am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-15   TvB	Refactored to use a function component
 * 2021-03-13	TvB	Added contact click callback
 * 2021-03-13	TvB	Updated header + Change import location
 */

import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import YoutubeCarousel from './youtube/YoutubeCarousel';
import ContactForm from './contact/ContactForm';
import Carousel from "./youtube/Carousel2";

export enum Page {
    Home = "Home", 
    Contact = "Contact"
};

function App(){
    const [ activePage, setActivePage ] = useState(Page.Home);

    // Temporary until navbar is refactored
    const handleContactClick = () => {
        setActivePage(activePage === Page.Home ? Page.Contact : Page.Home);
    };

    return (
        <div>
            <Navbar activePage={ activePage } setActivePage={ setActivePage } />
            {
                activePage === Page.Home ? (
                    <div>
                        <Carousel />
                    </div>
                ) : (
                    <ContactForm />
                )
            }
        </div>
    );
}

export default App;