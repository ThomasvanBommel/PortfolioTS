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
    host: string, 
    apiKey: string,
    channelId: string
} = { ...settings, apiKey: "", host: "" };

// Ensure config has apiKey and it exists
let key = process.env.YT_API_KEY;

if(key){
    config.apiKey = key;
}else{ throw new Error("Missing apiKey"); }

// Target location for config file
let config_file_location = join(__dirname, "../../config/.config.json");

// Try to load existing config file
try {
    
    // Create config from available pieces
    config = { ...config, ...require(config_file_location) };
} catch {
    
    // Inform user we needed to create a config file
    console.log(`Creating config file: ${config_file_location}`);

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

    // write hidden config file to /config folder
    fs.writeFileSync(config_file_location, JSON.stringify({
        channelId: config.channelId,
        host: config.host,
        port: config.port
    }));
}

export default config;