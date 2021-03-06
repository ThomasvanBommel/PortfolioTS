/*
 * File: webpack.config.js
 * Created: Friday March 19th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday March 25th 2021 8:29pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

const join = require("path").join;

module.exports = {
    mode: "production",

    entry: { client: join(__dirname, "src/index.test") },
    output: { path:  join(__dirname, "build"), filename: "test.js" },

    resolve: { extensions: [".ts", ".tsx", ".js", ".jsx", ".css"] },

    module: {
        rules: [
            { test: /\.tsx?$/, use: "ts-loader" },
            { test: /\.css$/,  use: ["style-loader", "css-loader"] },
        ]
    }
};