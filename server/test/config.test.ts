/*
 * Filename: test/server/src/config.test.ts
 * Created Date: Friday, March 5th 2021, 11:53:11 am
 * Author: Thomas vanBommel
 * 
 */

import assert from "assert";

const ROOT = process.env.ROOT;

if(!ROOT){
    console.error("No ROOT environment variable set");
    process.exit(1);
}

const config = require(ROOT + "/common/.server.config.json");

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
});