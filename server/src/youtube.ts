/*
 * Filename: server/src/youtube.ts
 * Created Date: Tuesday, February 9th 2021, 9:13:03 pm
 * Author: Thomas vanBommel
 * 
 */

type YouTubeOptions = { key: string };

export default class YouTube {
    options: YouTubeOptions;

    constructor(options: YouTubeOptions) {
        this.options = options;
    }

    update() {}
}