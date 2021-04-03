/*
 * File: serverApi.ts
 * Created: Wednesday March 31st 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 3rd 2021 7:15pm
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

export type Form = {
    email: string,
    message: string,
    name: string,
    subject: string
};

// Submit contact form
export const submitContactForm = async (form: Form) => {
    console.log("submitting form...");

    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            fetch(new Request("contact"), {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
                .then(res => res.json())
                .then(({ type, message }: { type: string, message: string }) => {
                    if(type !== "error")
                        return resolve(message);

                    reject(message);
                })
                .catch(err => reject(err));
        }, 1000);
    });
}