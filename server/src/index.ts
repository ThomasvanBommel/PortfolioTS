/*
 * Filename: server/src/index.ts
 * Created Date: Sunday, February 7th 2021, 12:18:27 am
 * Author: Thomas vanBommel
 * 
 */

import YouTube from "./youtube";
import Testing from "./Testing";
import config from "./config";
import express from "express";
import path from "path"

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

// tell server to start listening
let server = app.listen(config.port, () => {
    console.log(`👂 Listening @ http://${ config.host }:${ config.port }`);
});

// yt.requestVideos((err, videos) => {
//     console.log(err, videos, videos?.size);
// });

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