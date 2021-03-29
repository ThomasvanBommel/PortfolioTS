/*
 * File: App.tsx
 * Created: Saturday February 6th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Monday March 29th 2021 6:26pm
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

import { Provider } from "react-redux";
import store from "./store";

import { HashRouter, Switch, Route } from "react-router-dom";

function App(){
    return (
        <HashRouter>
            <Provider store={ store }>
                <Navbar />
                <Content />
                <ProgressBanner />
            </Provider>
        </HashRouter>
    );
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