/*
 * File: index.ts
 * Created Date: Sunday, February 7th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday March 30th 2021 5:57pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-30	TvB	Reverted back to relative file paths (new build dir)
 * 2021-03-27	TvB	Added requirement for process.env.ROOT 
 * 2021-03-25	TvB	Changed output formatting
 */

import config from "../../common/config.json";
import Database from "./database";
import YouTube from "./youtube";
import express from "express";
import path from "path";

// const config = require("../../common/.server.config.json");

let db = new Database();

// initialize express and youtube modules
const app = express();
const yt = new YouTube(config.channelId);

// Set headers using middleware
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "http://vanbommel.ca");
    res.set("X-Powered-By", "Sagittarius A*");
    next();
});

// request and cache videos every hour
yt.startCache();

// expose client build and dependencies folders
app.use("/bundle.js", express.static(path.join(__dirname, "../../client/src/bundle.js")));

// home get request
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../public/index.html"));
});

// youtube videos request
app.get("/youtube", (req, res) => {
    res.json(yt.videos);
});

app.get("/blogs", async (req, res) => {
    res.json(await db.blogs());
});

// tell server to start listening
let server = app.listen(config.port, config.host ?? "", () => {
    console.log(`👂 Listening @ http://${ config.host }:${ config.port }`);
});