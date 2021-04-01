/*
 * File: Blog.tsx
 * Created: Saturday March 27th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Wednesday March 31st 2021 11:48pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from "react";
import style from "./Blog.module.css";
import { useRouteMatch, Switch, Route } from "react-router-dom";

import BlogMaster from "./BlogMaster";
import BlogDetail from "./BlogDetail";

function Blog(){
    const { path } = useRouteMatch();

    return (
        <div className={ style.content }>
            <Switch>
                <Route path={ `${ path }/:slug` }>
                    <BlogDetail />
                </Route>

                <Route path={ path }>
                    <BlogMaster />
                </Route>
            </Switch>
        </div>
    );
}

export default Blog;