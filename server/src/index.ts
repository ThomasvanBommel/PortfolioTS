/*
 * File: index.ts
 * Created Date: Sunday, February 7th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday March 25th 2021 3:00pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-25	TvB	Changed output formatting
 */

import YouTube from "./youtube";
import express from "express";
import path from "path";

const config = require("../../common/.server.config.json");

// initialize express and youtube modules
const app = express();
const yt = new YouTube();

// Set headers using middleware
app.use((req, res, next) => {
    res.set("X-Powered-By", "Sagittarius A*");
    next();
});

// request and cache videos every hour
yt.startCache();

// expose client build and dependencies folders
app.use(express.static(path.join(__dirname, "../../client/build")));
app.use(express.static(path.join(__dirname, "../../client/dependencies")));

// home get request
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/views/index.html"));
});

// youtube videos request
app.get("/youtube", (req, res) => {
    res.set("Access-Control-Allow-Origin", "http://vanbommel.ca");
    res.json(yt.videos);
});

// tell server to start listening
let server = app.listen(config.port, config.host ?? "", () => {
    console.log(`👂 Listening @ http://${ config.host }:${ config.port }`);
});