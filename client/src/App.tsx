/*
 * File: App.tsx
 * Created: Saturday February 6th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday March 18th 2021 8:56pm
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
import ProgressBanner from "./progress_banner/ProgressBanner";

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
            <ProgressBanner />
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