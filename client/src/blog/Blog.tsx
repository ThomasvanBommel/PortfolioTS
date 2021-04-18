/*
 * File: Blog.tsx
 * Created: Saturday March 27th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 17th 2021 11:24pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from "react";
import style from "./Blog.module.css";
import { useRouteMatch, Switch, Route } from "react-router-dom";

import BlogMaster from "./BlogMaster";
import BlogDetail from "./BlogDetail";
import Footer from "../footer/Footer";

function Blog(){
    const { path } = useRouteMatch();

    return (
        <div className={ style.content }>
            <Switch>
                <Route path={ `${ path }/:slug` }>
                    <BlogDetail />
                    <Footer />
                </Route>

                <Route path={ path }>
                    <BlogMaster />
                    <Footer />
                </Route>
            </Switch>
        </div>
    );
}

export default Blog;