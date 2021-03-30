/*
 * Filename: test/server/src/config.test.ts
 * Created Date: Friday, March 5th 2021, 11:53:11 am
 * Author: Thomas vanBommel
 * 
 */

import assert from "assert";
import config from "../../common/config.json";

describe("config", () => {

    // Check config properties
    describe(".config", () => {

        // Check if the properties exist
        describe("exists", () => {

            // Check that channelId exists and is not empty
            it(".channelId", () => {
                assert.ok(!!config.channelId);
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