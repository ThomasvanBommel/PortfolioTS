/*
 * File: serverApi.ts
 * Created: Wednesday March 31st 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday April 1st 2021 12:16pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import config from "../../common/config.json";
import { Blog } from "../../common/types";

// Fetch all blogs from the server database
export const fetchAllBlogs = async (): Promise<Blog[]> => {
    return new Promise((resolve, reject) => {
        fetch(`http://${config.host}:${config.port}/blogs`)
            .then(res  => res.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
    });
};

export const incrementEmojiCount = async (slug: string, emoji: string) => {
    return new Promise((resolve, reject) => {
        fetch(`http://${config.host}:${config.port}/blog/${slug}/${emoji}`, {
            method: "POST"
        })
            .then(res => res.json())
            .then(json => {
                console.log("response:", json);
                resolve(json);
            })
            .catch(err => reject(err));
    });
};