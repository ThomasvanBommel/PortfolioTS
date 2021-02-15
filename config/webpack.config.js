/*
 * Filename: config/webpack.config.js
 * Created Date: Sunday, February 14th 2021, 11:45:00 pm
 * Author: Thomas vanBommel
 * 
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

    resolve: { extensions: [".ts", ".tsx", ".js", ".jsx"] },

    module: {
        rules: [
            { test: /\.tsx?$/, use: "ts-loader" }
        ]
    }
};