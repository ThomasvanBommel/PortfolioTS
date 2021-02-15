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