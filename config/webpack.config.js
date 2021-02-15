/*
 * Filename: client/webpack.config.js
 * Created Date: Sunday, February 14th 2021, 11:45:00 pm
 * Author: Thomas vanBommel
 * 
 */

const join = require("path").join;

module.exports = {
    mode: "production",

    entry: { client: join(__dirname, "../client/src/index.tsx") },
    output: { path:  join(__dirname, "../client/build"), filename: "bundle.js" },

    resolve: { extensions: [".ts", ".tsx", ".js", ".jsx"] },

    module: {
        rules: [
            { test: /\.tsx?$/, use: "ts-loader" }
        ]
    }
};