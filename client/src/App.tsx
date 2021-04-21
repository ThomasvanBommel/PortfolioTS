/*
 * File: App.tsx
 * Created: Saturday February 6th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Wednesday April 21st 2021 9:45am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-24	TvB	Added redux store support
 * 2021-03-15   TvB	Refactored to use a function component
 * 2021-03-13	TvB	Added contact click callback
 * 2021-03-13	TvB	Updated header + Change import location
 */

import React from 'react';
import store from "./store";
import Home from "./home/Home";
import Blog from "./blog/Blog";
import Navbar from './navbar/Navbar';
import Footer from "./footer/Footer";
import { Provider } from "react-redux";
import AdminLogin from "./admin/AdminLogin";
import ContactForm from './contact/ContactForm';
import { HashRouter, BrowserRouter, Switch, Route } from "react-router-dom";

function App(){
    return (
        <Provider store={ store }>
            <BrowserRouter basename="r">
                <Navbar />
                <Content />
            </BrowserRouter>
        </Provider>
    );
}

function Content(){
    return (
        <div>
            <Switch>
                <Route path="/blog">
                    <Blog />
                </Route>

                <Route path="/contact">
                    <ContactForm />
                </Route>

                <Route path="/login">
                    <AdminLogin />
                </Route>

                <Route path="/">
                    <Home />
                </Route>
            </Switch>

            <Footer />
        </div>
        
    );
}

export default App;