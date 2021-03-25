/*
 * File: App.tsx
 * Created: Saturday February 6th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday March 25th 2021 6:12pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-24	TvB	Added redux store support
 * 2021-03-15   TvB	Refactored to use a function component
 * 2021-03-13	TvB	Added contact click callback
 * 2021-03-13	TvB	Updated header + Change import location
 */

import React from 'react';
import Navbar from './navbar/Navbar';
import Carousel from "./youtube/Carousel";
import ContactForm from './contact/ContactForm';
import ProgressBanner from "./progress_banner/ProgressBanner";

import { Provider, useSelector } from "react-redux";
import { Page, getPage } from "./slices/pageSlice";
import store from "./store";

function App(){
    return (
        <Provider store={ store }>
            <Navbar />
            <Main />
            <ProgressBanner />
        </Provider>
    );
}

function Main(){
    let page = useSelector(getPage);

    if(page === Page.Home){
        return <Carousel />
    }

    return <ContactForm />
}

export default App;