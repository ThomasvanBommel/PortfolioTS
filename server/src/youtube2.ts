/*
 * Filename: server/src/youtube2.ts
 * Created Date: Saturday, March 6th 2021, 9:30:43 pm
 * Author: Thomas vanBommel
 * 
 */

import { Video, Thumbnail } from "../../common/types";
import request from "./request2";
import config from "./config";

export type YouTubeResponse = {
    items: Video[],
    nextPageToken?: string,

    [key: string]: unknown
};

export default class YouTube {

    // Request parameters
    parameters: { [key: string]: string | number } = {
        channelId: config.channelId,
        key: config.apiKey,
        part: "snippet",
        order: "rating",
        maxResults: 50,
        type: "video"
    };

    // Map to hold unique videos
    videos: Map<string, Video> = new Map();

    // Cache interval identifier
    cacheInterval: NodeJS.Timeout | undefined = undefined;


    cache(interval: number = 3600000){

        // Clear previous interval, if any
        if(this.cacheInterval)
            clearInterval(this.cacheInterval);

        
    }

    async requestVideos(nextPageToken?: string): Promise<Video[]>{
        let parameters = this.parameters;

        // Specify a page to retrieve
        if(nextPageToken)
            parameters.pageToken = nextPageToken;

        // Return request promise
        return new Promise((resolve, reject) => {

            // Request videos from youtube API
            request({
                hostname: "youtube.googleapis.com",
                path: "/youtube/v3/search",
                parameters: parameters
            }).then(response => {

                // Parse and cast youtube response
                let obj = <YouTubeResponse> JSON.parse(response.data);

                // Check for youtube errors
                if("error" in obj)
                    return reject(obj.error);
                    
                // Return videos from response
                resolve(obj.items);

            // Check for request errors
            }).catch(reject);
        });
    }
}