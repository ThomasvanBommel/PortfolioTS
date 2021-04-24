/*
 * Filename: test/server/src/request2.test.ts
 * Created Date: Saturday, March 6th 2021, 5:54:29 pm
 * Author: Thomas vanBommel
 * 
 */

import request from "../src/request"

// Testing the request module
describe("request", () => {


    // Verify response status code
    test("www.google.com", () => {
        expect.assertions(1);

        expect(async () => 
            request("https://www.google.com")
        ).not.toThrow();
    });

    // No api key test
    test("googleapis.com", async () => {
        expect.assertions(1);

        await expect(() =>
            request({
                hostname: "youtube.googleapis.com",
                path: "/youtube/v3/videos",
                parameters: {
                    reason: "testing"
                }
            })
        ).rejects.toThrow();
    });

    // Invalid url test
    test("123abcLMNOP.987", async () => {
        expect.assertions(1);

        await expect(() =>
            request("123abcLMNOP.987")
        ).rejects.toThrow();
    });
});