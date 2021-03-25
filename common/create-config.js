/*
 * File: create-config.js
 * Created: Friday March 19th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday March 25th 2021 1:58pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

const { networkInterfaces } = require("os");
const { writeFileSync } = require("fs");
const { join } = require("path");

// initialize
let config = {
    apiKey: process.env.YT_API_KEY,
    port: process.env.NODE_ENV === "development" ? 8000 : 80,
    channelId: "UCbVqDf-obg_ylZZjNp1hK7Q",
    host: getIP()
};

// find host ip
function getIP(){
    for(const [key, value] of Object.entries(networkInterfaces()))
        if(key !== "lo")
            for(const obj of value)
                if(obj.family === "IPv4")
                    return obj.address;
}

// stringify data
const serverData = JSON.stringify(config);
const clientData = JSON.stringify({ port: config.port, host: config.host });

// confirm
if(!config.apiKey)
    throw new Error("Missing API key");

if(!config.host)
    throw new Error("Missing host");

// write files
const serverPath = join(__dirname, ".server.config.json");
const clientPath = join(__dirname, ".client.config.json");
writeFileSync(join(__dirname, ".server.config.json"), serverData);
writeFileSync(join(__dirname, ".client.config.json"), clientData);

// log results
console.log("Created config files:");
console.log(" -", serverPath);
console.log(" -", clientPath);