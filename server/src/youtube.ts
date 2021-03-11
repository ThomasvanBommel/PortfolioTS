/*
 * Filename: server/src/youtube2.ts
 * Created Date: Saturday, March 6th 2021, 9:30:43 pm
 * Author: Thomas vanBommel
 * 
 */

import { YouTubeSnippet, YouTubeStatistics, YouTubeVideo } from "../../common/types";
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
        order: "date",
        maxResults: 50,
    };

    // Cache interval identifier
    cacheInterval_: NodeJS.Timeout | undefined = undefined;

    // Date / time the videos were last cached
    lastCached: Date | undefined = undefined;

    // List of cached videos
    videos: YouTubeVideo[] = [];

    /**
     * Set the parameters used for the information request methods
     * Accepted parameters found here: https://developers.google.com/youtube/v3/docs/search/list
     * @param { YouTubeParameters } parameters - Parameters to override the existing ones
     */
    setParameters(parameters: YouTubeParameters){
        this.parameters_ = { ...this.parameters_, ...parameters };
    }

    /**
     * Cache videos in this.videos every refreshInterval, optionally with statistics
     * @param { boolean } [ withStatistics=true ] - Add videos statistics to the YouTubeVideo object
     * @param { number } [ refreshInterval=3600000 ] - How often to refresh the cache in 
     * milliseconds, (default 1h) 
     */
    startCache(withStatistics=true, refreshInterval: number = _1hour){

        // Clear previous interval, if any
        if(this.cacheInterval_)
            clearInterval(this.cacheInterval_);

        // Run immediately
        this.cache(withStatistics);

        // Run every refreshInterval
        this.cacheInterval_ = setInterval(this.cache, refreshInterval, withStatistics);
    }

    /**
     * Request videos from the YouTube API and store that 'cache' in this.videos after updating
     * lastCache time and optionally adding video statistics 
     * @param { boolean } withStatistics - Should the cached videos include statistics
     */
    async cache(withStatistics: boolean){

        // Get video snippets
        const videos = await this.getVideoSnippets();

        // Optionally add statistics
        if(withStatistics)
            await this.addVideoStatistics(videos, true);

        // Update cache time
        this.lastCached = new Date();

        // Update video cache
        this.videos = videos;
    }

    /**
     * Get video 'snippets' for the channel specified by 'channelId' in this.parameters 
     * This function loops through each 'page' of results returned by the YouTube API
     * 
     * Note: Each page has a 'quota cost' of 100 units, of the APIs maximum 10,000/day.
     * Quota information: https://developers.google.com/youtube/v3/getting-started#quota
     * @param { number } [ pageLimit=0 ] - How many pages to retrieve; 0 for all pages (default 0)
     * @param { "search" | "video" } [ location=search ] - What endpoint to use, (default search)
     * - 'search' will retrieve the videos for the channelId in the config (cost of 100 per page)
     * - 'video' will retrieve random video snippets (used for cheap testing, cost of 1 per page)
     * This option should only be used for testing
     * @returns { Promise<YouTubeVideo[]> } - Array of requested videos
     */
    async getVideoSnippets(pageLimit: number=0, location: "search" | "videos" = "search")
        : Promise<YouTubeVideo[]> {

        try{
            // Set up a copy of the request parameters with a few defaults
            let params: YouTubeParameters = { 
                ...this.parameters_, type: "video", part: "snippet" 
            };

            // If location is videos we need to set 'chart' or API will error
            // Since it should only be used in testing, we set it to mostPopular
            if(location === "videos")
                params["chart"] = "mostPopular";

            // Attempt request
            const response = await this.recurseResponse_<YouTubeSnippet>({
                hostname: "youtube.googleapis.com",
                path: `/youtube/v3/${location}`,
                parameters: params
            }, pageLimit);

            // Check for response
            if(!response)
                throw new Error("No response");

            // Return snippet after converting into videos
            return Promise.resolve(response.map(item => <YouTubeVideo> {
                id: item.id.videoId ?? item.id,
                snippet: item.snippet
            }));
        }catch(error){

            // Error has occured
            return Promise.reject(error);
        }
    }

    /**
     * Request video statistics and add them to the list of videos provided
     * This function loops through each 'page' of results returned by the YouTube API
     * 
     * Note: Each page has a 'quota cost' of 1 unit, of the APIs maximum 10,000/day.
     * Quota information: https://developers.google.com/youtube/v3/getting-started#quota
     * @param { YouTubeVideo[] } videos - List of videos to add statistics to
     * @param { boolean } [ modifyVideos=false ] - Should the function modify the list of videos, or 
     * clone the list and return a new list (preventing changes to the provided one) default = false
     * @returns { YouTubeVideo[] } List of videos with statistics added
     */
    async addVideoStatistics(videos: YouTubeVideo[], modifyVideos=false): Promise<YouTubeVideo[]> {
        try{
            // Optionally modify incoming video list or clone (no modification to the parameter)
            let videosCopy: YouTubeVideo[] = modifyVideos ? videos : JSON.parse(
                JSON.stringify(videos)
            );

            // Combine video ids into a comma-separated string
            const ids = videosCopy.map(video => video.id).join(",");

            // Attempt request
            const response = await this.recurseResponse_<YouTubeStatistics>({
                hostname: "youtube.googleapis.com",
                path: "/youtube/v3/videos",
                parameters: { 
                    ...this.parameters_, 
                    part: "statistics",
                    id: ids
                }
            });

            // Check for response
            if(!response)
                throw new Error("No response");

            // Add statistics to the list of videos
            videosCopy.forEach((video, i) => {

                // Ensure both, videos and statistics lists are in the same order
                if(video.id !== response[i].id)
                    throw new Error("Order mismatch between videos and statistics");

                video.statistics = response[i].statistics;
            });

            // Return videos with statistics added
            return Promise.resolve(videosCopy);
        }catch(error){

            // Error has occured
            return Promise.reject(error);
        }
    }

    /**
     * Request youtube snippets or statistics for videos on a specified endpoint
     * @param { YouTubeOptions } options - API options 
     * @param { number } [ pageLimit=0 ] - How many pages to retrieve; 0 for all pages (default 0)
     * @param { string } [ pageToken_ ] - YouTube's nextPageToken identifier (used for recursion)
     * @returns YouTubeSnippet or YouTubeStatistics based on the options hostname and path
     */
    async recurseResponse_<T extends YouTubeSnippet | YouTubeStatistics>(options: YouTubeOptions, 
        pageLimit: number=0, pageToken_?: string): Promise<T[]>{

        // Specify page to retrieve
        if(pageToken_) options.parameters.pageToken = pageToken_;

        try{
            // Attempt request
            const requestResponse = await request(options);

            // Parse response
            const youtubeResponse = <YouTubeResponse> JSON.parse(requestResponse.data);

            // Check if we should/can recurse to the next page of results
            if(--pageLimit > 0 && youtubeResponse.nextPageToken)

                // Return this page and next page's items
                return Promise.resolve([ 
                    ...<T[]> youtubeResponse.items,
                    ...await this.recurseResponse_<T>(options, pageLimit, youtubeResponse.nextPageToken)
                ]);

            // Return result, we're finished!
            return Promise.resolve(<T[]> youtubeResponse.items);
        }catch(error){

            // Error has occured, reject promise
            return Promise.reject(error);
        }
    }
}

