/*
 * Filename: server/src/youtube2.ts
 * Created Date: Saturday, March 6th 2021, 9:30:43 pm
 * Author: Thomas vanBommel
 * 
 */

import { YouTubeSnippet, YouTubeStatistics, YouTubeVideo, isYouTubeSnippet, isYouTubeStatistics } from "../../common/types";
import request from "./request2";
import config from "./config";

// 1 hour in milliseconds
const _1hour = 1000 * 60 * 60;

export type YouTubeResponse = {
    items: YouTubeSnippet[] | YouTubeStatistics[],
    nextPageToken?: string,

    [key: string]: unknown
};

export type YouTubeParameters = {
    [key: string]: string | number
};

export type YouTubeOptions = {
    hostname: string,
    path: string,
    parameters: YouTubeParameters
};

export default class YouTube {

    // Request parameters
    parameters_: YouTubeParameters = {
        channelId: config.channelId,
        key: config.apiKey,
        order: "rating",
        maxResults: 50,
        type: "video"
    };

    // Map to hold unique videos
    // videos: Map<string, Video> = new Map();

    // Cache interval identifier
    cacheInterval_: NodeJS.Timeout | undefined = undefined;


    /**
     * Set the parameters used for the getVideoSnippets method
     * 
     * Accepted parameters found here: https://developers.google.com/youtube/v3/docs/search/list
     * Note: 'type' and 'part' should be left as their default values to avoid errors
     * @param { YouTubeParameters } parameters - Parameters to override the existing ones
     */
    setParameters(parameters: YouTubeParameters){
        this.parameters_ = { ...this.parameters_, ...parameters };
    }

    startCache(checkNew: number = _1hour, refreshList: number = _1hour * 24){

        // Clear previous interval, if any
        if(this.cacheInterval_)
            clearInterval(this.cacheInterval_);

        // (async () => {
        //     const videos = await(this.getVideoSnippets(1));


        // })();
    }

    /**
     * Get video 'snippets' for the channel specified by 'channelId' in this.parameters 
     * This function loops through each 'page' of results returned by the YouTube API
     * 
     * Note: Each page has a 'quota cost' of 100 units, of the APIs maximum 10,000/day.
     * Quota information: https://developers.google.com/youtube/v3/getting-started#quota
     * @param { number } [ limit=0 ] - How many pages to retrieve; 0 for all pages (default 0)
     * @returns { Promise<Video[]> } - Array of requested videos
     */
    async getVideoSnippets(limit: number=0): Promise<YouTubeVideo[]> {
        try{
            // Attempt request
            const response = await this.recurseResponse<YouTubeSnippet>({
                hostname: "youtube.googleapis.com",
                path: "/youtube/v3/search",
                parameters: { ...this.parameters_, part: "snippet" }
            }, limit);

            // Return snippet after converting into videos
            return Promise.resolve(response.map(item => <YouTubeVideo> {
                id: item.id.videoId,
                snippet: item
            }));
        }catch(error){

            // Error has occured
            return Promise.reject(error);
        }
    }

    /**
     * 
     * @param options 
     * @param { number } [ limit=0 ] - How many pages to retrieve; 0 for all pages (default 0)
     * @param { string } [ pageToken_ ] - YouTube's nextPageToken identifier (used for recursion)
     * @returns 
     */
    async recurseResponse<T extends YouTubeSnippet | YouTubeStatistics>(options: YouTubeOptions, limit: number=0, pageToken_?: string): Promise<T[]>{

        // Specify page to retrieve
        if(pageToken_) options.parameters.pageToken = pageToken_;

        try{
            // Attempt request
            const requestResponse = await request(options);

            // Parse response
            const youtubeResponse = <YouTubeResponse> JSON.parse(requestResponse.data);

            // Check if we should/can recurse to the next page of results
            if(--limit && youtubeResponse.nextPageToken)

                // Return this page and next page's items
                return Promise.resolve([ 
                    ...<T[]> youtubeResponse.items,
                    ...await this.recurseResponse<T>(options, limit, youtubeResponse.nextPageToken)
                ]);
            
            // Return result, we're finished!
            return Promise.resolve(<T[]> youtubeResponse.items);
        }catch(error){

            // Error has occured, reject promise
            return Promise.reject(error);
        }
    }


    
}

