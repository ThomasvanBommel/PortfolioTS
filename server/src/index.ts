/*
 * Filename: server/src/index.ts
 * Created Date: Sunday, February 7th 2021, 12:18:27 am
 * Author: Thomas vanBommel
 * 
 */

import YouTube from "./youtube";
import express from "express";
import path from "path"

const app = express();
const yt = new YouTube({ 
    key: process.env.YT_API_KEY ?? "",
    id: process.env.YT_ID ?? ""
});

// expose client build and dependencies folders
app.use(express.static(path.join(__dirname, "../../client/build")));
app.use(express.static(path.join(__dirname, "../../client/dependencies")));

// home get request
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/views/index.html"));
});

// youtube get request
// app.get("/api/youtube/:service", (req, res) => {
//     request.default({ 
//         host: "youtube.googleapis.com",
//         path: `/youtube/v3/${ req.params.service }`,
//         parameters: {
//             key: "value",
//             key2: "value",
//         }
//     }, request.accumulator((err, res, data) => {
//         console.log(err, res, data);
//     }));
// });

// listen on 8000
app.listen(8000, () => console.log("http://localhost:8000"));
