/*
 * File: index.ts
 * Created Date: Sunday, February 7th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Friday April 2nd 2021 1:11pm
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
import helmet from "helmet";
import path from "path";

let db = new Database();

// initialize express and youtube modules 
const app = express();
const yt = new YouTube(config.channelId);

// setup helmet to protect from some well-known web vulnerabilities 
app.use(helmet());

// set headers using middleware
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "http://vanbommel.ca");
    res.set("X-Powered-By", "Sagittarius A*");
    next();
});

// request and cache videos every hour
yt.startCache();

// expose client build and dependencies folders
app.use("/bundle.js", express.static(path.join(__dirname, "../../client/src/bundle.js")));
app.use(express.static(path.join(__dirname, "../../../public")));

// expose .well-known/acme-challenge for certbot acme challenges
app.use(express.static(path.join(__dirname, "../../../.well-known/acme-challenge")));

// home get request
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../public/index.html"));
});

// youtube videos request
app.get("/youtube", (req, res) => {
    res.json(yt.videos);
});

// endpoint to recieve all blogs
app.get("/blogs", async (req, res) => {
    res.json(await db.blogs());
});

// endpoint to increment blog emoji count
app.post("/blog/:slug/:emoji", async (req, res) => {
    const slug = req.params.slug;
    const emoji = req.params.emoji;

    if(slug && (emoji === "coffee" || emoji === "thumbsup" || emoji === "clap")){
        return res.json(await db.incrementEmojiCount(slug, emoji));
    }else{
        res.json(new Error("Blog not found or emoji is invalid"));
    }
});

// tell server to start listening
let server = app.listen(config.port, config.host ?? "", () => {
    console.log(`👂 Listening @ http://${ config.host }:${ config.port }`);
});