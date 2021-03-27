/*
 * Filename: common/types.ts
 * Created Date: Sunday, February 14th 2021, 2:37:39 pm
 * Author: Thomas vanBommel
 * 
 */

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