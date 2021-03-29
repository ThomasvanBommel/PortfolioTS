/*
 * File: webpack.config.js
 * Created: Sunday February 14th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Monday March 29th 2021 5:39pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-27	TvB	Changed over to be always production mode
 * 2021-03-13   TvB	Updated header
 */

const join = require("path").join;

// export webpack config
module.exports = {
    mode: process.env.NODE_ENV === "development" ? "development" : "production",

    entry: { client: join(__dirname, "./index.tsx") },
    output: { path:  join(__dirname, "../build/src"), filename: "bundle.js" },

    resolve: { extensions: [".ts", ".tsx", ".js", ".jsx", ".css"] },

    module: {
        rules: [
            { test: /\.tsx?$/, use: { loader: "ts-loader", options: { "projectReferences": true }} },
            { test: /\.css$/,  use: ["style-loader", "css-loader"] }
        ]
    }
};