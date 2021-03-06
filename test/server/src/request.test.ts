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

describe("request", () => {

    // Test the default export, request()
    describe(".request", () => {

        // Test request with the youtube API
        describe("youtube", () => {

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

                        // Verify - expected response code of 403
                        if(res.statusCode === 403)
                            return done();

                        done("Unexpected statusCode, " + res.statusCode);
                    });
                });
            });

            // Check that the API is working
            it("get the 5 most popular videos", done => {

                // Setup
                let loc: RequestOptions = {
                    host: "youtube.googleapis.com",
                    path: "/youtube/v3/videos",
                    parameters: {
                        key: config.apiKey ?? "",
                        chart: "mostPopular",
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

                        // Verify - expected response code of 200
                        if(res.statusCode !== 200)
                            return done(data);

                        let videos: Video[] = JSON.parse(data).items;

                        done();
                    });
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