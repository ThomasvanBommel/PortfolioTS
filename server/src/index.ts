/*
 * Filename: server/src/index.ts
 * Created Date: Sunday, February 7th 2021, 12:18:27 am
 * Author: Thomas vanBommel
 * 
 */

import YouTube from "./youtube2";
import config from "./config"; // TODO : Remove
import express from "express";
import path from "path";

// check if we should only configure
if(process.argv.includes("--config"))
    process.exit(0);

// initialize express and youtube modules
const app = express();
const yt = new YouTube();

// request and cache videos every hour
yt.startCache();

// expose client build and dependencies folders
app.use(express.static(path.join(__dirname, "../../../../client/build")));
app.use(express.static(path.join(__dirname, "../../../../client/dependencies")));

// home get request
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../../client/views/index.html"));
});

// youtube videos request
app.get("/youtube", (req, res) => {
    res.json(yt.videos);
});

// tell server to start listening
let server = app.listen(config.port, config.host ?? "", () => {
    console.log(`👂 Listening @ http://${ config.host }:${ config.port }`);
});