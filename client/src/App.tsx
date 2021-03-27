/*
 * File: App.tsx
 * Created: Saturday February 6th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday March 27th 2021 2:14pm
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

import { Provider, useSelector, useDispatch } from "react-redux";
import { Page, getPage } from "./slices/pageSlice";
import { fetchVideos } from "./slices/videoSlice";
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
    // Load youtube videos
    useDispatch()(fetchVideos);

    return <Content />
}

function Content(){
    // Display the correct page
    switch(useSelector(getPage)){
        case Page.Contact:
            return <ContactForm />

        case Page.Blog:
            return (<div></div>);

        default:
            return <Carousel />
    }
}

export default App;