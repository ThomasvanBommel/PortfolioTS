/*
 * File: serverApi.ts
 * Created: Wednesday March 31st 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 3rd 2021 12:48pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { Blog, isBlog } from "../../common/types";

// Fetch all blogs from the server database
export const fetchAllBlogs = async (): Promise<Blog[]> => {
    return new Promise((resolve, reject) => {
        fetch(new Request("blogs"))
            .then(res  => res.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
    });
};

// Increment blogs emoji counter
export const incrementEmojiCount = async (slug: string, emoji: string) => {
    return new Promise((resolve, reject) => {
        fetch(new Request(`blog/${slug}/${emoji}`, {
            method: "POST"
        }))
            .then(res => res.json())
            .then(json => {
                if(Array.isArray(json) && isBlog(json[0]))
                    resolve(json[0]);

                reject(json);
            })
            .catch(err => reject(err));
    });
};

export const submitContactForm = async () => {
    return new Promise((resolve, reject) => {

    });
}