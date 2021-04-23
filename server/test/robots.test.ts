/*
 * File: robots.test.ts
 * Created: Thursday April 22nd 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday April 22nd 2021 8:47pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { sitemap } from "../src/robots";
import assert from "assert";

describe("robots", function() {
    describe("sitemap", function() {
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

        it("root", function() {
            assert.ok(map.match(host));
        });

        it("/r/", function() {
            assert.ok(map.match(host + "/r/"));
        });

        it("/r/contact", function() {
            assert.ok(map.match(host + "/r/contact"));
        });

        it("/r/login", function() {
            assert.ok(map.match(host + "/r/login"));
        });

        it("/r/blog", function() {
            assert.ok(map.match(host + "/r/blog"));
        });

        for(const blog of blogs)
            it("/r/blog/" + blog.slug, function() {
                assert.ok(map.match(host + "/r/blog/" + blog.slug));
            });
    });
});