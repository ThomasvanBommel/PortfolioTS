/*
 * File: robots.ts
 * Created: Monday April 19th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Monday April 19th 2021 8:21pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { Blog } from "../../common/types";

export function sitemap(blogs: Blog[]){
    let host = "https://vanbommel.ca";
    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url><loc>${ host }/#/</loc></url>
            <url><loc>${ host }/#/contact</loc></url>
            <url><loc>${ host }/#/blog</loc></url>
            ${ blogs.map(blog => 
                `<url><loc>${ host }/#/blog/${ blog.slug }</loc></url>`    
            ) }
        </urlset>`.replace(/  +/g, "");
}