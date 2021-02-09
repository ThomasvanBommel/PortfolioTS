/*
 * Filename: server/src/index.ts
 * Created Date: Sunday, February 7th 2021, 12:18:27 am
 * Author: Thomas vanBommel
 * 
 */


import express from "express";
import path from "path"

const app = express();

// expose client build and dependencies folders
app.use(express.static(path.join(__dirname, "../../client/build")));
app.use(express.static(path.join(__dirname, "../../client/dependencies")));

// home get request
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/views/index.html"));
});

// listen on 8000
app.listen(8000, () => console.log("http://localhost:8000"));
