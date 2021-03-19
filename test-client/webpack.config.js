/*
 * File: webpack.config.js
 * Created: Sunday February 14th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Friday March 19th 2021 4:19pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-13 12:40pm	TvB	Updated header
 */

const join = require("path").join;

module.exports = {
    mode: "production",

    entry: { client: join(__dirname, "src/index.ts") },
    output: { path:  join(__dirname, "build"), filename: "test.js" },

    resolve: { extensions: [".ts", ".tsx", ".js", ".jsx", ".css"] },

    module: {
        rules: [
            { test: /\.tsx?$/, use: "ts-loader" },
            { test: /\.css$/,  use: ["style-loader", "css-loader"] }
        ]
    }
};