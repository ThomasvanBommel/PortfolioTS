/*
 * Filename: server/src/config.ts
 * Created Date: Saturday, February 13th 2021, 9:36:17 pm
 * Author: Thomas vanBommel
 * 
 */

import settings from "../../config/server.config.json";
import { networkInterfaces } from "os";
import { join } from "path";
import fs from "fs";

// import config from /config
let config: { 
    port: number, 
    host?: string, 
    apiKey?: string,
    channelId: string
} = settings;

// Target location for config file
let file_location = join(__dirname, "../../config/.config.json");

// Ensure config has apiKey
if(!config.apiKey)
    config.apiKey = process.env.YT_API_KEY;

try {
    // Create config from available pieces
    config = { ...require(file_location) };
    console.log("CONFIG", config);
} catch {
    
    // Inform user we needed to create a config file
    console.log(`Creating config file: ${file_location}`);

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
    fs.writeFileSync(file_location, JSON.stringify(tmp));
}

export default config;