/*
 * Filename: common/types.ts
 * Created Date: Sunday, February 14th 2021, 2:37:39 pm
 * Author: Thomas vanBommel
 * 
 */

/// Types --------------------------------------------------------------------------------------- */

export type Thumbnail = {
    url: string,
    width: number,
    height: number
};

export type Video = {
    id: string,
    title: string,
    description: string,
    thumbnails: { [key: string]: Thumbnail },
    published: Date
};

export type UnknownObject = {
    [key: string]: unknown
};

export type YouTubeSnippetData = {
    publishedAt: string,
    channelId: string,
    title: string,
    description: string,
    thumbnails: { [key: string]: Thumbnail },
    channelTitle: string,
    liveBroadcastContent: string
};

export type YouTubeSnippet = {
    id: { kind: string, videoId: string },
    snippet: YouTubeSnippetData
};

export type YouTubeStatisticsData = {
    viewCount: number,
    likeCount: number,
    dislikeCount: number,
    favoriteCount: number,
    commentCount: number
};

export type YouTubeStatistics = {
    id: string,
    statistics: YouTubeStatisticsData
};

export type YouTubeVideo = {
    id: string,
    snippet: YouTubeSnippetData,
    statistics?: YouTubeStatisticsData,
};

/// Checks -------------------------------------------------------------------------------------- */

/**
 * Check if an object is of type YouTubeSnippet
 * @param { UnknownObject } item - Unknown object
 * @returns true if type-check is successful, false otherwise
 */
export function isYouTubeSnippet(item: UnknownObject){
    if(!hasObjects_(item, "id", "snippet")) return false;

    const id = <Object> item.id;
    const snippet = <Object> item.snippet;

    return (
        "kind" in id &&
        "videoId" in id &&
        "publishedAt" in snippet &&
        "channelId" in snippet &&
        "title" in snippet &&
        "description" in snippet &&
        "thumbnails" in snippet &&
        "channelTitle" in snippet &&
        "liveBroadcastContent" in snippet
    );
}

/**
 * Check if an object is of type YouTubeStatistics
 * @param { UnknownObject } item - UnknownObject
 * @returns true if type-check is successful, false otherwise
 */
export function isYouTubeStatistics(item: UnknownObject){
    if(!hasObjects_(item, "id", "statistics")) return false;

    const statistics = <Object> item.statistics;

    return (
        "viewCount" in statistics &&
        "likeCount" in statistics &&
        "dislikeCount" in statistics &&
        "favoriteCount" in statistics &&
        "commentCount" in statistics
    );
}

/// Helper Functions ---------------------------------------------------------------------------- */

/**
 * Check if an unknown variable is, an object, and has properties defined
 * @param { unknown } item - Unknown variable
 * @param { ...string } properties - Properties to check item for, if its an object
 * @returns true if item is of type "object" and contains all properties provides, false otherwise 
 */
function hasObjects_(item: unknown, ...properties: string[]): boolean{
    let property = properties.shift();

    if(!property || item && typeof item === "object" && property in item){
        if(properties.length > 0)
            return true && hasObjects_(item, ...properties);

        return true;
    }

    return false;
}