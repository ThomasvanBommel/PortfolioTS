/*
 * Filename: server/src/config.ts
 * Created Date: Saturday, February 13th 2021, 9:36:17 pm
 * Author: Thomas vanBommel
 * 
 */

// application configuration (default falsy)
const config = {
    host: process.env.HOST ?? "",
    port: Number(process.env.PORT) ?? 0,
    yt_channel_id: process.env.YT_CHANNEL_ID ?? "",
    yt_api_key: process.env.YT_API_KEY ?? ""
};

let config_ok = true;

// check each env var individually
for(let [key, value] of Object.entries(config)){
    if(!value){
        console.error("Missing environment variable", key.toUpperCase());
        config_ok = false;
    }
}

// check configuration values
if(!config_ok){
    console.error("Missing one or more environment variables");
    console.log("Did you forget to load the configuration?");
    process.exit(1);
}

export default config;