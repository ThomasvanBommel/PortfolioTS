/*
 * File: AdminLogin.tsx
 * Created: Tuesday April 20th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday April 20th 2021 4:10pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from "react";

import { Helmet } from "react-helmet";

import style from "./AdminLogin.module.css";

function AdminLogin(){
    return (
        <div>
            <Helmet>
                <title>Admin: vanbommel.ca</title>
                <meta name="description" content="Admin panel" />
            </Helmet>
            Admin Login
        </div>
    );
}

export default AdminLogin;