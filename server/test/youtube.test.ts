/*
 * Filename: test/server/src/youtube2.test.ts
 * Created Date: Saturday, March 6th 2021, 10:29:22 pm
 * Author: Thomas vanBommel
 * 
 */

import YouTube, { YouTubeParameters } from "../src/youtube";
import { YouTubeVideo } from "../../common/types";
import config from "../../common/config.json";
import assert from "assert";

describe("youtube", function() {
    let youtube = new YouTube(config.channelId);

    // unit-cost of 2*i units 
    for(let i = 1; i <= 2; i++){
        const maxResults = 5;
        const pageLimit = 1 * i;
        const count = maxResults * pageLimit;

        let videos: YouTubeVideo[] = [];
        let parameters: YouTubeParameters = {};

        describe(`test ${i}`, function() {

            before("create YouTube object", function() {
                youtube = new YouTube(config.channelId);

                youtube.setParameters({
                    "maxResults": maxResults,
                });

                parameters = youtube.parameters_;
            });

            describe(".setParameters", function() {
                it("'channelId' exists", function() {
                    assert.ok(!!youtube.parameters_["channelId"]);
                });

                it("'key' exists", function() {
                    assert.ok(!!youtube.parameters_["key"]);
                });

                it("'order' exists", function() {
                    assert.ok(!!youtube.parameters_["order"]);
                });

                it(`'maxResults' is ${maxResults}`, function() {
                    assert.strictEqual(youtube.parameters_["maxResults"], maxResults);
                });
            });

            describe("http requests", function() {
                it(`get [${count}] video snippets`, function() {
                    return youtube.getVideoSnippets(pageLimit, "videos").then((vids: YouTubeVideo[]) => {
                        videos = vids;
                    });
                });

                it("get video statistics", function() {
                    return youtube.addVideoStatistics(videos, true);
                });
            });

            describe("values", function() {
                it("check for video statistics", function() {
                    let result = true;

                    for(let video of videos)
                        result = result && !!video.statistics;

                    assert.strictEqual(result, true);
                });

                it(`check video count is ${count}`, function() {
                    assert.strictEqual(videos.length, count);
                });

                it("ensure parameters stayed the same", function() {
                    assert.deepStrictEqual(youtube.parameters_, parameters);
                });
            });
        });
    }
});