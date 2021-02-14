/*
 * Filename: server/src/youtube.ts
 * Created Date: Tuesday, February 9th 2021, 9:13:03 pm
 * Author: Thomas vanBommel
 * 
 */

import * as request from "./request";

type YouTubeOptions  = { key: string, id: string };
type YouTubeResponse = { [key: string]: unknown };

type Thumbnail = {
    url: string,
    width: number,
    height: number
};

type Video = {
    id: string,
    title: string,
    description: string,
    thumbnails: { [key: string]: Thumbnail },
    published: Date
};

type SuccessCallback = (success: boolean) => void;
type VideoCallback = (err: Error | undefined, videos?: Map<string, Video>) => void;

export default class YouTube {
    options: YouTubeOptions;
    videos: Map<string, Video>;

    /**
     * Create a new YouTube object
     * @param options - Youtube options object
     * @param options.key - Youtube API key
     * @param options.id - Youtube channel id
     */
    constructor(options: YouTubeOptions) {
        this.options = options;
        this.videos = new Map();
    }

    /**
     * Script to test the API key provided (check for 200 response)
     * @param callback - Success callback
     */
    test(callback: SuccessCallback) {
        request.default({ 
            host: "youtube.googleapis.com",
            path: `/youtube/v3/videos`,
            parameters: {
                key: this.options.key,
                part: "snippet",
                chart: "mostPopular"
            }
        }, request.accumulator((err, res, data="{}") => {

            // check requests reponse status + errors
            if(!err && res?.statusCode === 200) 
                return callback(true);

            console.error("Response code:", res?.statusCode);
            console.error("Response:", data);

            // response status is bad
            callback(false);
        }));
    }

    /**
     * Recursively request videos and store them in this.videos
     * @param callback Data and error callback
     * @param nextPageToken Recursive parameter, no need to set it yourself
     */
    requestVideos(callback: VideoCallback, nextPageToken?: string) {
        // parameters for request
        let parameters = {
            key: this.options.key,
            channelId: this.options.id,
            pageToken: nextPageToken ?? "",
            maxResults: "50",
            part: "snippet",
            type: "video",
            order: "date"
        }

        // send request
        request.default({ 
            host: "youtube.googleapis.com",
            path: `/youtube/v3/search`,
            parameters: parameters
        }, request.accumulator((err, res, data="{}") => {

            // check for errors
            if(err) return callback(err);

            // parse response data
            let response: YouTubeResponse = JSON.parse(data);

            // extract video details
            this.extractVideoDetails(response);

            // if true there are more results we can fetch
            if("nextPageToken" in response && typeof response.nextPageToken === "string") {

                // recurse
                this.requestVideos(callback, response.nextPageToken);
            }else{

                // no more results, return what we've found
                callback(undefined, this.videos);
            }
        }));
    }

    /**
     * Extract video details and add them to the local this.videos map
     * @param response - Youtube api response
     */
    extractVideoDetails(response: YouTubeResponse) {
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
                            "description" in item.snippet &&
                            "thumbnails" in item.snippet &&
                            ("publishedAt" in item.snippet || "publishTime" in item.snippet)){
                            
                            // add video to the map
                            this.videos.set(id, {
                                id: id,
                                title: item.snippet.title,
                                description: item.snippet.description,
                                thumbnails: item.snippet.thumbnails,
                                published: item.snippet.publishedAt ?? item.snippet.publishTime
                            });
                        }
                    }
                } catch {

                    // casting error
                    console.error("Unable to cast video from youtube response:\n", item);
                }
            });
        }
    }
}