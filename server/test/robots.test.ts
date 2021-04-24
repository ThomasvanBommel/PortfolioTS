/*
 * File: robots.test.ts
 * Created: Thursday April 22nd 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 24th 2021 5:44pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { sitemap } from "../src/robots";

describe("robots", () => {
    describe("sitemap", () => {
        let blogs = [
            { slug: "testing" },
            { slug: "test2" },
            { slug: "test3" },
            { slug: "abc" },
            { slug: "def" },
            { slug: "ghi" },
        ];
        let map = sitemap(blogs);
        let host = "https://vanbommel.ca";

        test("root", () => {
            expect(map).toMatch(host);
            // assert.ok(map.match(host));
        });

        test("/r/", () => {
            expect(map).toMatch(host + "/r/");
            // assert.ok(map.match(host + "/r/"));
        });

        test("/r/contact", () => {
            expect(map).toMatch(host + "/r/contact");
            // assert.ok(map.match(host + "/r/contact"));
        });

        test("/r/login", () => {
            expect(map).toMatch(host + "/r/login");
            // assert.ok(map.match(host + "/r/login"));
        });

        test("/r/blog", () => {
            expect(map).toMatch(host + "/r/blog");
            // assert.ok(map.match(host + "/r/blog"));
        });

        test.each(blogs)("contains link for %p", (blog) => {
            expect(map).toMatch(host + "/r/blog/" + blog.slug);
        });

        // for(const blog of blogs)
        //     test("/r/blog/" + blog.slug, () => {
        //         assert.ok(map.match(host + "/r/blog/" + blog.slug));
        //     });
    });
});