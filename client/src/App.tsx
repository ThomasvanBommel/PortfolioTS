/*
 * File: App.tsx
 * Created: Saturday February 6th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Sunday March 28th 2021 1:23pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-24	TvB	Added redux store support
 * 2021-03-15   TvB	Refactored to use a function component
 * 2021-03-13	TvB	Added contact click callback
 * 2021-03-13	TvB	Updated header + Change import location
 */

import React from 'react';
import Home from "./home/Home";
import Blog from "./blog/Blog";
import Navbar from './navbar/Navbar';
import ContactForm from './contact/ContactForm';
import ProgressBanner from "./progress_banner/ProgressBanner";

import { Provider, useSelector, useDispatch } from "react-redux";
import { Page, getPage } from "./slices/pageSlice";
import { fetchVideos } from "./slices/videoSlice";
import { fetchEvents } from './slices/eventSlice';
import { fetchBlogs } from './slices/blogSlice';

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
    useDispatch()(fetchEvents);
    useDispatch()(fetchBlogs);

    return <Content />
}

function Content(){
    // Display the correct page
    switch(useSelector(getPage)){
        case Page.Contact:
            return <ContactForm />

        case Page.Blog:
            return <Blog />;

        default:
            return <Home />
    }
}

export default App;