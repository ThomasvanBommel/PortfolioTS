/*
 * Filename: server/src/youtube.ts
 * Created Date: Tuesday, February 9th 2021, 9:13:03 pm
 * Author: Thomas vanBommel
 * 
 */

import * as request from "./request";

type YouTubeOptions  = { key: string, id: string };
type YouTubeResponse = { [key: string]: unknown };

type Video = {
    id: string,
    title: string,
    description: string
};

export default class YouTube {
    options: YouTubeOptions;
    videos: Map<string, Video>;

    constructor(options: YouTubeOptions) {
        this.options = options;
        this.videos = new Map();

        // this.requestVideos();
    }

    requestVideos() {
        request.default({ 
            host: "youtube.googleapis.com",
            path: `/youtube/v3/search`,
            parameters: {
                key: this.options.key,
                channelId: this.options.id,
                maxResults: "25",
                part: "snippet",
                type: "video",
                order: "date"
            }
        }, request.accumulator((err, res, data="{}") => {
            if(err) return console.error(err);

            let response: YouTubeResponse = JSON.parse(data);

            // ensure items in response and is of type Array
            if("items" in response && response.items instanceof Array) {

                // foreach item in the array
                response.items.forEach(item => {

                    // try because we're casting from unknown (any)
                    try {

                        // ensure the item has a videoId
                        if("id" in item && "videoId" in item.id){
                            let id: string = item.id.videoId;

                            // check for video details AKA "snippet"
                            if( "snippet" in item && 
                                "title" in item.snippet &&
                                "description" in item.snippet){
                                
                                // add video to the map
                                this.videos.set(id, {
                                    id: id,
                                    title: item.snippet.title,
                                    description: item.snippet.description
                                });
                            }
                        }
                    } catch {
                        // casting error
                        console.error("Unable to cast video from youtube response:\n", item);
                    }
                });

                console.log(this.videos);
            }

            // if true there are more results we can fetch
            if("nextPageToken" in response) {
                // console.log(response);
            }
        }));
    }
}