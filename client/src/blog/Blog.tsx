/*
 * File: Blog.tsx
 * Created: Saturday March 27th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday April 20th 2021 11:14am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-04-20	TvB	Broke up component
 * 2021-04-20	TvB	Added react helmet support
 */

import React from "react";
import style from "./Blog.module.css";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import BlogMaster from "./BlogMaster";
import BlogDetail from "./BlogDetail";
import Footer from "../footer/Footer";

function Blog(){
    const { path } = useRouteMatch();

    return (
        <div className={ style.content }>
            <Helmet>
                <title>Blogs: vanbommel.ca</title>
                <meta name="description" content="List of available blogs" />
            </Helmet>
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