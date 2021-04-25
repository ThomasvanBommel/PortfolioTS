/*
 * File: webpack.config.js
 * Created: Friday March 19th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 24th 2021 9:56pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

const { join, basename } = require("path");
const { readdirSync, lstatSync } = require("fs");

function getFiles(dir, pre=""){
    const files = [];
    
    readdirSync(dir).filter(file => {
        if(file.match(/.*.tsx?/))
            files.push(join(pre, file));

        const path = join(dir, file);

        if(lstatSync(path).isDirectory())
            files.push(...getFiles(path, join(pre, file)));
    });

    return files;
}

function getEntries() {
    return getFiles("./client/test").reduce((prev, file) => {
        const base = basename(file);
        prev[ base.substr(0, base.indexOf(".")) ] = "./client/test/" + file;
        return prev;
    }, {});
}

module.exports = {
    mode: "development",

    entry: getEntries,
    output: { path: join(__dirname, "../../build/client/test"), filename: "[name].test.js" },

    resolve: { extensions: [".ts", ".tsx", ".js", ".jsx", ".css"] },

    module: {
        rules: [
            { test: /\.tsx?$/, use: { loader: "ts-loader", options: { "projectReferences": true }} },
            { test: /\.css$/,  use: ["style-loader", "css-loader"] },
        ]
    }
};