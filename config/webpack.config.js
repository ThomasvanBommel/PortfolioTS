/*
 * File: webpack.config.js
 * Created: Sunday February 14th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday March 13th 2021 12:40pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-13 12:40pm	TvB	Updated header
 */

const join = require("path").join;

// check if the script is being run with --dev, if so set to dev mode
const development = process.argv.includes("--dev");

// tell user we're in dev mode or not
if(development)
    console.log("Starting webpack in development mode");

// export webpack config
module.exports = {
    mode: development ? "development" : "production",

    entry: { client: join(__dirname, "../client/src/index.tsx") },
    output: { path:  join(__dirname, "../client/build"), filename: "bundle.js" },

    resolve: { extensions: [".ts", ".tsx", ".js", ".jsx", ".css"] },

    module: {
        rules: [
            { test: /\.tsx?$/, use: "ts-loader" },
            { test: /\.css$/,  use: ["style-loader", "css-loader"] }
        ]
    }
};