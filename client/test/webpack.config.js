/*
 * File: webpack.config.js
 * Created: Friday March 19th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Friday April 23rd 2021 2:53pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

const join = require("path").join;

module.exports = {
    mode: "development",

    entry: { client: join(__dirname, "index.test.tsx") },
    output: { path:  join(__dirname, "../../build/client/test"), filename: "test.js" },

    resolve: { extensions: [".ts", ".tsx", ".js", ".jsx", ".css"] },

    module: {
        rules: [
            { test: /\.tsx?$/, use: { loader: "ts-loader", options: { "projectReferences": true }} },
            { test: /\.css$/,  use: ["style-loader", "css-loader"] },
        ]
    }
};