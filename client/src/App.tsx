/*
 * File: App.tsx
 * Created: Saturday February 6th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday April 20th 2021 4:15pm
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
import { HashRouter, Switch, Route } from "react-router-dom";

function App(){
    return (
        <Provider store={ store }>
            <HashRouter>
                <Navbar />
                <Content />
            </HashRouter>
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