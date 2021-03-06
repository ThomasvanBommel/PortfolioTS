/*
 * Filename: test/server/src/config.test.ts
 * Created Date: Friday, March 5th 2021, 11:53:11 am
 * Author: Thomas vanBommel
 * 
 */

import config from "../../../server/src/config";
import assert from "assert";
import path from "path";
import fs from "fs";

describe("config", () => {

    // Check config properties
    describe(".config", () => {

        // Check if the properties exist
        describe("exists", () => {

            // Check that channelId exists and is not empty
            it(".channelId", () => {
                assert.ok(!!config.channelId);
            });

            // Check that apiKey exists and is not empty
            it(".apiKey", () => {
                // console.log("API TRUTHY:", !!config.apiKey, config.apiKey);
                assert.ok(!!config.apiKey);
            });

            // Check that port exists and is not 0
            it(".port", () => {
                assert.ok(!!config.port);
            });

            // Check that host exists and is not empty
            it(".host", () => {
                assert.ok(!!config.host);
            });
        });

        // Check the properties type
        describe("type-check", () => {

            // Check that channelId is a string type
            it(".channelId", () => {
                assert.strictEqual(typeof config.channelId, "string");
            });

            // Check that apiKey is a string type
            it(".apiKey", () => {
                assert.strictEqual(typeof config.apiKey, "string")
            });

            // Check that port is a number type
            it(".port", () => {
                assert.strictEqual(typeof config.port, "number");
            });

            // Check that host is a string type
            it(".host", () => {
                assert.strictEqual(typeof config.host, "string");
            });
        });
    });

    // Check if a file was created
    describe("file output", () => {

        // Location of the expected output file
        let loc = path.join(__dirname, "../../../config/.config.json");

        // Ensure output file was created
        it(loc, () => {

            // Check that the output config file exists
            assert.doesNotThrow(() => {
                fs.statSync(loc);
            });
        });
    });
});