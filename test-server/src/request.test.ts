/*
 * Filename: test/server/src/request2.test.ts
 * Created Date: Saturday, March 6th 2021, 5:54:29 pm
 * Author: Thomas vanBommel
 * 
 */

import request, { RequestResponse } from "../../server/build/request"
import assert from "assert";

// Testing the request module
describe("request", function() {

    // Verify response status code
    it("www.google.com", function() {
        assert.doesNotReject(async function() {
            await request("https://www.google.com");
        });
    });

    // No api key test
    it("googleapis.com", function() {
        assert.rejects(async function() {
            await request({
                hostname: "youtube.googleapis.com",
                path: "/youtube/v3/videos",
                parameters: {
                    reason: "testing"
                }
            });
        });
    });

    // Invalid url test
    it("123abcLMNOP.987", function() {
        assert.rejects(async function() {
            await request("123abcLMNOP.987");
        });
    });
});