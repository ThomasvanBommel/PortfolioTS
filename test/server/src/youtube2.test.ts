/*
 * Filename: test/server/src/youtube2.test.ts
 * Created Date: Saturday, March 6th 2021, 10:29:22 pm
 * Author: Thomas vanBommel
 * 
 */

import YouTube from "../../../server/src/youtube2";
import { Video } from "../../../common/types";
import assert from "assert";

describe("youtube2", () => {

    let videos: Video[];

    before(async () => {
        videos = await new YouTube().requestVideos();
    });

    it("more than 1 video returned", () => {
        assert.ok(videos.length > 0);
    });
});