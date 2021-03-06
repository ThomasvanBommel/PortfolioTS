/*
 * Filename: test/server/src/request2.test.ts
 * Created Date: Saturday, March 6th 2021, 5:54:29 pm
 * Author: Thomas vanBommel
 * 
 */

import request, { RequestResponse } from "../../../server/src/request2"
import assert from "assert";

// Testing the request module
describe("request2", () => {

    // Testing the default export of the module
    describe("default", () => {

        // Testing a request on google.com
        describe("google.com", () => {

            let response: RequestResponse;

            // Get response from google.com
            before(async () => {
                response = await request("https://www.google.com");
            });

            // Verify response status code
            it("status code 200", () => {
                assert.strictEqual(response.message.statusCode, 200);
            });
        });

        // Testing a request on googleapis.com
        describe("googleapis.com", () => {

            let response: RequestResponse;

            // Get response
            before(async () => {
                response = await request({
                    hostname: "youtube.googleapis.com",
                    path: "/youtube/v3/videos"
                });
            });

            // Verify response status code
            it("status code 403", () => {
                assert.strictEqual(response.message.statusCode, 403);
            });

            // Check response data
            it("check error message says missing API key", () => {
                let data = JSON.parse(response.data);
                let expected = "The request is missing a valid API key."

                // Ensure data includes parameter error.message
                if("error" in data && "message" in data.error)

                    // Check message
                    return assert.strictEqual(data.error.message, expected);

                // Throw error if parameter doesn't exist
                throw new Error("Missing error or message parameter");
            });
        });

        // Test an invalid url
        describe("123abcLMNOP.987", () => {

            // Expected failure test
            it("expected error", async () => {
                try{

                    // Try invalid url
                    await request("123abcLMNOP.987");
                }catch{

                    // Thrown error means a pass
                    return assert.ok(true);
                }

                // Throw error if the test passed
                throw new Error("This test should have failed");
            });
        });
    });
});