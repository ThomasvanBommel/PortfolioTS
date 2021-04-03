/*
 * File: index.ts
 * Created Date: Sunday, February 7th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 3rd 2021 11:47am
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
import https from "https";
import http from "http";
import path from "path";
import fs from "fs";

const credentials = {
    cert: fs.readFileSync(path.join(__dirname, "../../../.cert/cert.pem")),
    key: fs.readFileSync(path.join(__dirname, "../../../.cert/privkey.pem"))
};

let db = new Database();

// initialize express and youtube modules 
const app = express();
const yt = new YouTube(config.channelId);

// set headers middleware
app.use(setHeaders);
function setHeaders(req: express.Request, res: express.Response, next: express.NextFunction){
    res.set("Access-Control-Allow-Origin", "https://vanbommel.ca");
    res.set("X-Powered-By", "Sagittarius A*");
    next();
};

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post("/", (req, res) => {
    console.log(req.body);

    if("email" in req.body)
        if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(req.body.email))
            return res.send("Thanks! A notification has been sent.");

    res.send("The email provided was invalid or missing...");
});

// tell server to start listening on secure port
https.createServer(credentials, app).listen(config.port, config.host, () => {
    console.log(`👂 Listening @ https://${ config.host }:${ config.port }`);
});

// redirect from insecure to secure port
const redirect = express();

// use the same headers
redirect.use(setHeaders);

// redirect traffic from all endpoints
redirect.all("*", (req, res) => {
    
    // replace the port with the secure version
    const host = req.headers.host?.replace(/:\d+/g, `:${ config.port }`);

    // redirect
    res.redirect(`https://${ host }${ req.url }`);
});

// listen for requests
redirect.listen(config.redirect, config.host, () => 
    console.log(`⏩ Redirect  @  http://${ config.host }:${ config.redirect }`)
);