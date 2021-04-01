/*
 * File: Blog.tsx
 * Created: Saturday March 27th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Wednesday March 31st 2021 4:39pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from "react";
import style from "./Blog.module.css";
import { useRouteMatch, Switch, Route } from "react-router-dom";

import Master from "./Master";
import Detail from "./Detail";

function Blog(){
    const { path } = useRouteMatch();

    return (
        <div className={ style.content }>
            <Switch>
                <Route path={ `${ path }/:slug` }>
                    <Detail />
                </Route>

                <Route path={ path }>
                    <Master />
                </Route>
            </Switch>
        </div>
    );
}

export default Blog;