/*
 * Filename: server/src/index.ts
 * Created Date: Sunday, February 7th 2021, 12:18:27 am
 * Author: Thomas vanBommel
 * 
 */

import YouTube from "./youtube";
import express from "express";
import path from "path"

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

const app = express();
const yt = new YouTube({ 
    key: config.yt_api_key,
    id:  config.yt_channel_id
});

// expose client build and dependencies folders
app.use(express.static(path.join(__dirname, "../../client/build")));
app.use(express.static(path.join(__dirname, "../../client/dependencies")));

// home get request
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/views/index.html"));
});

// youtube get request
// app.get("/api/youtube/:service", (req, res) => {
//     request.default({ 
//         host: "youtube.googleapis.com",
//         path: `/youtube/v3/${ req.params.service }`,
//         parameters: {
//             key: "value",
//             key2: "value",
//         }
//     }, request.accumulator((err, res, data) => {
//         console.log(err, res, data);
//     }));
// });

// listen on $PORT
app.listen(config.port, () => console.log(`http://${ config.host }:${ config.port }`));
