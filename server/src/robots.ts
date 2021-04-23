/*
 * File: robots.ts
 * Created: Monday April 19th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday April 22nd 2021 8:45pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

export function sitemap(blogs: { slug: string }[]){
    let host = "https://vanbommel.ca";
    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url><loc>${ host }</loc></url>
            <url><loc>${ host }/r/</loc></url>
            <url><loc>${ host }/r/contact</loc></url>
            <url><loc>${ host }/r/login</loc></url>
            <url><loc>${ host }/r/blog</loc></url>
            ${ blogs.map(blog => 
                `<url><loc>${ host }/r/blog/${ blog.slug }</loc></url>`    
            ) }
        </urlset>`.replace(/  +/g, "");
}