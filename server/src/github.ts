/*
 * File: github.ts
 * Created: Sunday March 28th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Sunday March 28th 2021 12:49am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import request from "./request";

export async function test(){
    console.log(JSON.parse((await request({
        hostname: "api.github.com",
        path: "/users/thomasvanbommel/events",
        headers: {
            "User-Agent": "Thomas vanBommel"
        }
    })).data));
}

