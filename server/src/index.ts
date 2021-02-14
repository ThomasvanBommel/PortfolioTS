/*
 * Filename: server/src/index.ts
 * Created Date: Sunday, February 7th 2021, 12:18:27 am
 * Author: Thomas vanBommel
 * 
 */

import config from "./config";
import YouTube from "./youtube";
import express from "express";
import path from "path"

console.log("ARGV", process.argv);

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

// listen on $PORT
app.listen(config.port, () => console.log(`http://${ config.host }:${ config.port }`));
