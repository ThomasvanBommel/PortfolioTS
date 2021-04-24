/*
 * File: youtube.test.ts
 * Created Date: Saturday, March 6th 2021, 10:29:22 pm
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 24th 2021 5:31pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-04-24	TvB	Modified for jest
 */

import YouTube, { YouTubeParameters } from "../src/youtube";
import { YouTubeVideo } from "../../common/types";
import config from "../../common/config.json";

describe("youtube", function() {
    let youtube = new YouTube(config.channelId);

    for(let i = 1; i <= 2; i++){
        const maxResults = 5;
        const pageLimit = 1 * i;
        const count = maxResults * pageLimit;

        let videos: YouTubeVideo[] = [];
        let parameters: YouTubeParameters = {};

        describe(`test ${i}`, function() {
            youtube = new YouTube(config.channelId);

            youtube.setParameters({
                "maxResults": maxResults,
            });

            parameters = youtube.parameters_;

            describe(".setParameters", function() {
                test("'channelId' exists", function() {
                    expect(!!youtube.parameters_["channelId"]).toBeTruthy();
                });

                test("'key' exists", function() {
                    expect(!!youtube.parameters_["key"]).toBeTruthy();
                });

                test("'order' exists", function() {
                    expect(!!youtube.parameters_["order"]).toBeTruthy();
                });

                test(`'maxResults' is ${maxResults}`, function() {
                    expect(youtube.parameters_["maxResults"]).toBe(maxResults);
                });
            });

            describe("http requests", function() {
                test(`get [${count}] video snippets`, async () => {
                    expect.assertions(1);
                    
                    await youtube.getVideoSnippets(pageLimit, "videos").then((vids: YouTubeVideo[]) => {
                        videos = vids;
                    });

                    expect(videos).toHaveLength(count);
                });

                test("get video statistics", async() => {
                    expect.assertions(count);
                    await youtube.addVideoStatistics(videos, true);
                    
                    for(const video of videos)
                        expect(video).toHaveProperty("statistics");
                });
            });

            describe("values", function() {
                test("check for video statistics", function() {
                    let result = true;

                    for(let video of videos)
                        result = result && !!video.statistics;

                    expect(result).toBeTruthy();
                });

                test(`check video count is ${count}`, function() {
                    expect(videos).toHaveLength(count);
                });

                test("ensure parameters stayed the same", function() {
                    expect(youtube.parameters_).toStrictEqual(parameters);
                });
            });
        });
    }
});