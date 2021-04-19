/*
 * File: index.ts
 * Created Date: Sunday, February 7th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Monday April 19th 2021 8:34pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-04-19	TvB	Added robots.txt and sitemap.xml endpoints
 * 2021-03-30	TvB	Reverted back to relative file paths (new build dir)
 * 2021-03-27	TvB	Added requirement for process.env.ROOT 
 * 2021-03-25	TvB	Changed output formatting
 */

import config from "../../common/config.json";
import nodemailer from "nodemailer";
import { sitemap } from "./robots";
import Database from "./database";
import YouTube from "./youtube";
import express from "express";
import https from "https";
import path from "path";
import fs from "fs";

const credentials = {
    cert: fs.readFileSync(path.join(__dirname, "../../../.cert/cert.pem")),
    key: fs.readFileSync(path.join(__dirname, "../../../.cert/privkey.pem"))
};

let db = new Database();

// setup mail transporter
const mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

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

// endpoint for robot crawlers
app.get("/robots.txt", (req, res) => {
    res.type("txt");
    res.send(`
        User-agent: *
        Disallow:
        Sitemap: https://vanbommel.ca/sitemap.xml
    `.replace(/  +/g, "").replace(/^\n/g, ""));
});

// endpoint for sitemap
app.get("/sitemap.xml", async (req, res) => {
    try{
        res.type("xml");
        res.send(sitemap(await db.blogs()));
    }catch{
        res.sendStatus(404);
    }
});

// endpoint for collecting contact form data
app.post("/contact", (req, res) => {

    // check for required parameters
    if("email" in req.body && "name" in req.body && "subject" in req.body && "message" in req.body){

        // check they are submitting a properly formatted email address
        if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(req.body.email)){

            // log request
            console.log(req.ip, req.body);

            // send email
            mailer.sendMail({
                from: `"${ req.body.name }" <${ req.body.email }>`,
                to: "thomas@vanbommel.ca",
                subject: req.body.subject,
                text: req.body.message + "\n\nFrom: " + req.body.email
            }, (err, info) => {
                if(err){
                    console.error(err);

                    // error sending email
                    return res.json({ 
                        type: "error",
                        message: "Internal error."
                    });
                }else{
                    // email successful!
                    return res.json({ 
                        type: "success",
                        message: "Thanks! I'll be in touch." 
                    });
                }
            });
        }else{
            // invalid email address
            res.json({ 
                type: "error",
                message: "Invalid email adress..." 
            });
        }
    }else{
        // missing parameters
        res.json({ 
            type: "error",
            message: "Missing parameters..." 
        });
    }
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