/*
 * Filename: server/src/config.ts
 * Created Date: Saturday, February 13th 2021, 9:36:17 pm
 * Author: Thomas vanBommel
 * 
 */

import { networkInterfaces } from "os";
import { join } from "path";
import fs from "fs";

// import config from /config
const config: { 
    port: number, 
    host?: string, 
    apiKey?: string,
    channelId: string
} = require("../../config/server.config.json");

// get apiKey from env vars if not set in config file
if(!config.apiKey)
    config.apiKey = process.env.YT_API_KEY;

// Find this machines IP adress if host is missing
if(!config.host){
    for(let [key, value] of Object.entries(networkInterfaces())){

        // ignore local addresses
        if(key != "lo" && value){
            for(let i of value){

                // accept ipv4 address only
                if("family" in i && i.family == "IPv4"){
                    if("address" in i){
                        config.host = i.address;
                        break;
                    }
                }
            }
        }

        // break if we found an IP
        if(config.host)
            break;
    }
}

// set to false if config is not ok
let config_ok = true;

// check each var individually
for(let [key, value] of Object.entries(config)){
    if(!value){
        console.error("Missing config variable", key);
        config_ok = false;
    }
}

// check configuration values
if(!config_ok){
    console.error("Missing one or more config variables");
    process.exit(1);
}

// tmp value to store in a tmp file
let tmp = { ...config };

// remove apikey from tmp
delete tmp.apiKey;

// write hidden config file to /config folder
fs.writeFileSync(join(__dirname, "../../config/.config.json"), JSON.stringify(tmp));

export default config;