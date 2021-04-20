/*
 * File: AdminLogin.tsx
 * Created: Tuesday April 20th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday April 20th 2021 4:28pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React, { useState } from "react";
import { Helmet } from "react-helmet";

import Spinner from "../spinner/Spinner";
import style from "./AdminLogin.module.css";

function AdminLogin(){
    const [ loading, setLoading ] = useState(false);

    function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        event.stopPropagation();

        setLoading(true);
    }

    if(loading)
        return (
            <Spinner />
        );

    return (
        <div className={ style.container }>
            <Helmet>
                <title>Admin: vanbommel.ca</title>
                <meta name="description" content="Admin panel" />
            </Helmet>
            <p>Admin Login</p>
            <form action="#" method="POST" onSubmit={ handleSubmit }>
                <input type="text" name="username" placeholder="Username" />
                <br/>
                <input type="password" name="password" placeholder="Password" />
                <br/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    );
}

export default AdminLogin;