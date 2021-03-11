/*
 * Filename: test/server/src/request.test.ts
 * Created Date: Friday, March 5th 2021, 7:23:40 pm
 * Author: Thomas vanBommel
 * 
 */

import request, { RequestOptions, AccumulatorCallback } from "../../../server/src/request";
import config from "../../../server/src/config";
import { Video } from "common/types";
import assert from "assert";
import http from "http";
import net from "net";

describe.skip("request", () => {

    // Test the default export, request()
    describe(".default", () => {

        // Check forbidden 
        describe("403", () => {
            let statusCode: number;

            // Request
            describe("test", () => {

                // Test request without an API key
                it("try to access forbidden resource (no api key)", done => {

                    // Setup
                    let loc: RequestOptions = {
                        host: "youtube.googleapis.com",
                        path: "/youtube/v3/videos"
                    };

                    // Exercise
                    request(loc, (err, res) => {

                        // Verify - no errors
                        if(err) done(err);

                        let data = "";

                        res?.on("data", d => data += d);
                        res?.on("end", () => {

                            // set status code to check later
                            statusCode = res.statusCode ?? 0;

                            done();
                        });
                    });
                });
            });

            // Check response
            describe("response", () => {

                // Check response code
                it("code 403", () => {

                    // Ensure restricted access code (forbidden)
                    assert.strictEqual(statusCode, 403);
                });
            });
        });

        // Check proper request
        describe("200", () => {
            let videos: Video[];
            let statusCode: number;

            // Request
            describe("test", () => {
                // Check that the API is working
                it("get the 5 most popular videos", done => {

                    // Setup
                    let loc: RequestOptions = {
                        host: "youtube.googleapis.com",
                        path: "/youtube/v3/videos",
                        parameters: {
                            key: config.apiKey ?? "",
                            chart: "mostPopular",
                            maxResults: "5",
                            part: "snippet"
                        }
                    };

                    // Exercise
                    request(loc, (err, res) => {

                        // Verify - no errors
                        if(err) done(err);

                        let data = "";

                        res?.on("data", d => data += d);
                        res?.on("end", () => {

                            // set values to be checked in the next tests
                            statusCode = res.statusCode ?? 0;
                            videos = JSON.parse(data).items;

                            done();
                        });
                    });
                });
            });

            // Check response
            describe("response", () => {

                // Check response code
                it("code 200", () => {

                    // Verify - expected response code of 200
                    assert.strictEqual(statusCode, 200);
                });

                // Check response type
                it("type isArray", () => {

                    // Verify - check if response is an array
                    assert.ok(Array.isArray(videos));
                });

                // Check response amount
                it("count 5", () => {

                    // Verify - number of videos returned
                    assert.strictEqual(videos.length, 5);
                });
            });
        });
    });

    // Test the secondary export, accumulator()
    describe(".accumulator", () => {

        // Test the accumulator with a simple string
        it("test accumulation 'hello world'", () => {

            // Setup 
            let expected = "hello world";
            let result = "";

            // send or 'emit' one letter at a time, ensuring the accumulator can
            // reconstruct the data correctly
            function accumulate(callback: AccumulatorCallback){
                let socket = new net.Socket();
                let incomingMessage = new http.IncomingMessage(socket);

                for(let i = 0; i < expected.length; i++){
                    callback(undefined, incomingMessage, expected.charAt(i));
                    incomingMessage.emit("data");
                }

                incomingMessage.emit("end");
            }

            // Exercise
            accumulate((err, res, data) => {
                if(err) throw err;

                result += data;
            });

            // Verify
            assert.strictEqual(result, expected);
        });
    });
});