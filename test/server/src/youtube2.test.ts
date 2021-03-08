/*
 * Filename: test/server/src/youtube2.test.ts
 * Created Date: Saturday, March 6th 2021, 10:29:22 pm
 * Author: Thomas vanBommel
 * 
 */

import YouTube from "../../../server/src/youtube2";
import { YouTubeSnippet, isYouTubeSnippet } from "../../../common/types";
import assert from "assert";

describe("youtube2", () => {

    describe("isYouTubeSnippet", () => {

        it("should fail", () => {
            assert.ok(!isYouTubeSnippet({
                id: "hello!"
            }));
        });

        it("should fail", () => {
            assert.ok(!isYouTubeSnippet({
                id: { kind: "", videoId: "" }
            }));
        });

        it("should fail", () => {
            assert.ok(!isYouTubeSnippet({
                id: { kind: "", videoId: "" },
                snippet: {
                    publishedAt: "",
                    channelId: "",
                    title: ""
                }
            }));
        });

        it("should fail", () => {
            assert.ok(!isYouTubeSnippet({
                id: { kind: "", videoId: "" },
                snippet: {
                    publishedAt: "",
                    channelId: "",
                    title: "",
                    description: "",
                    thumbnails: [],
                    channelTitle: ""
                }
            }));
        });

        it("should pass", () => {
            assert.ok(isYouTubeSnippet({
                id: { kind: "", videoId: "" },
                snippet: {
                    publishedAt: "",
                    channelId: "",
                    title: "",
                    description: "",
                    thumbnails: [],
                    channelTitle: "",
                    liveBroadcastContent: ""
                }
            }));
        });
    });

    // console.log(keyof YouTubeSnippet)

    // new YouTube().startCache();

    // let videos: Video[];

    // before(async () => {
    //     videos = await new YouTube().getVideoSnippets();
    // });

    // it("more than 1 video returned", () => {
    //     assert.ok(videos.length > 0);

    //     console.log("LENGTH", videos.length);
    // });
});