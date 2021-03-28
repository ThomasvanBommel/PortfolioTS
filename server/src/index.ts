/*
 * File: index.ts
 * Created Date: Sunday, February 7th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Sunday March 28th 2021 12:51am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-27	TvB	Added requirement for process.env.ROOT 
 * 2021-03-25	TvB	Changed output formatting
 */

import YouTube from "./youtube";
import express from "express";
import path from "path";

// import { test } from "./github";
// (async () => {
//     await test();
// })();

const ROOT = process.env.ROOT;

if(!ROOT){
    console.error("No ROOT environment variable set");
    process.exit(1);
}

const config = require(ROOT + "/common/.server.config.json");

// initialize express and youtube modules
const app = express();
const yt = new YouTube(config.channelId, config.apiKey);

// Set headers using middleware
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "http://vanbommel.ca");
    res.set("X-Powered-By", "Sagittarius A*");
    next();
});

// request and cache videos every hour
// yt.startCache();

// expose client build and dependencies folders
app.use("/bundle.js", express.static(path.join(ROOT, "client/build/src/bundle.js")));
app.use(express.static(path.join(ROOT, "client/dependencies")));

// home get request
app.get("/", (req, res) => {
    res.sendFile(path.join(ROOT, "client/views/index.html"));
});

// youtube videos request
app.get("/youtube", (req, res) => {
    res.json(yt.videos);
});

// app.get("/github", (req, res) => {
    
// });

// tell server to start listening
let server = app.listen(config.port, config.host ?? "", () => {
    console.log(`👂 Listening @ http://${ config.host }:${ config.port }`);
});