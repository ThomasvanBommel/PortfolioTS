/*
 * Filename: server/src/index.ts
 * Created Date: Sunday, February 7th 2021, 12:18:27 am
 * Author: Thomas vanBommel
 * 
 */

import YouTube from "./Youtube";
import Testing from "./Testing";
import express from "express";
import path from "path"

console.log("KEY", process.env.YT_API_KEY);

import config from "./config";

// path to the client directory
const client_dir = path.join(__dirname, "../../client/");

// setup express application and initialize youtube object
const app = express();
const yt = new YouTube({ 
    key: config.yt_api_key,
    id:  config.yt_channel_id
});

// expose client build
app.use(express.static(client_dir + "build"));

// home get request
app.get("/", (req, res) => {
    res.sendFile(client_dir + "views/index.html");
});

// tell server to start listening
let server = app.listen(config.port, () => {
    console.log(`👂 Listening @ http://${ config.host }:${ config.port }`);
});

// check if we should be testing
if(process.argv.includes("--test")){

    // once the server connects
    server.on("listening", () => {

        // create testing object and run all available tests
        new Testing(yt).testAll(() => {

            // testing finished, close the server
            console.log("\n✅ Testing successful!");
            console.log("📴 Shuttig down server...");
            server.close();
        });
    });
}