/*
 * File: AdminLogin.tsx
 * Created: Tuesday April 20th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Wednesday April 21st 2021 11:33am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { login } from "../serverApi";

import Spinner from "../spinner/Spinner";
import style from "./AdminLogin.module.css";

function AdminLogin(){
    const [ loading, setLoading ] = useState(false);
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");

    function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        event.stopPropagation();

        setLoading(true);

        // console.log(new FormData(event.target as HTMLFormElement));
        login({ username: username, password: password })
            .then(res => console.log(res))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }

    console.log(error);

    if(loading)
        return (
            <div className={ style.container }>
                <Spinner />
                <br/>
                <p>Awaiting server response...</p>
            </div>
        );

    return (
        <div className={ style.container }>
            <Helmet>
                <title>Admin: vanbommel.ca</title>
                <meta name="description" content="Login panel" />
            </Helmet>
            { error ? (<div className={ style.error }>{ error }</div>) : "" }
            <h1>Login</h1>
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