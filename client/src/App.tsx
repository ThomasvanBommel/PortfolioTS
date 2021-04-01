/*
 * File: App.tsx
 * Created: Saturday February 6th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Wednesday March 31st 2021 10:52pm
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

import { Provider, useDispatch } from "react-redux";
import store from "./store";
import { fetchAllBlogs } from "./slices/blogSlice2";

import { HashRouter, Switch, Route } from "react-router-dom";

function App(){
    return (
        <Provider store={ store }>
            <HashRouter>
                <Init />
                <Navbar />
                <Content />
                <ProgressBanner />
            </HashRouter>
        </Provider>
    );
}

function Init(){
    // useDispatch()(fetchAllBlogs());

    return <div></div>;
}

function Content(){
    return (
        <Switch>
            <Route path="/blog">
                <Blog />
            </Route>

            <Route path="/contact">
                <ContactForm />
            </Route>

            <Route path="/">
                <Home />
            </Route>
        </Switch>
    );
}

export default App;