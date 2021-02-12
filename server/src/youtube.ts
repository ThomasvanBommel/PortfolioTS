/*
 * Filename: server/src/youtube.ts
 * Created Date: Tuesday, February 9th 2021, 9:13:03 pm
 * Author: Thomas vanBommel
 * 
 */

import * as request from "./request";

type YouTubeOptions = { key: string, id: string };

export default class YouTube {
    options: YouTubeOptions;

    constructor(options: YouTubeOptions) {
        this.options = options;

        this.update();
    }

    update() {
        request.default({ 
            host: "youtube.googleapis.com",
            path: `/youtube/v3/search`,
            parameters: {
                key: this.options.key,
                part: "snippet,statistics",
                type: "video",
                order: "date",
                maxResults: "50",
                channelId: ""
            }
        }, request.accumulator((err, res, data) => {
            // console.log(err, res, data);
            console.log(data);
        }));
    }
}