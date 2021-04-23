/*
 * File: database.test.ts
 * Created: Thursday April 22nd 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday April 22nd 2021 11:50pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { isBlog, Blog, Emoji } from "../../common/types";
import Database from "../src/database";
import assert from "assert";

describe("Database", function() {
    let db: Database;
    let blogs: Blog[] = [];

    // Initialize database
    before(function(done) {
        db = new Database();
        db.setup()
            .then(res => done())
            .catch(err => done(err));
    });

    // Fetch blogs
    before(function(done) {
        db.blogs()
            .then(res => {
                blogs = res;
                done();
            })
            .catch(err => done(err));
    });

    // Check blog model
    describe("Blog", function() {

        // Check each blog
        it("isBlog tests", function() {
            let result = true;

            blogs.forEach(blog => {
                const res = isBlog(blog);
                result = result && res;
                console.log(`      ${ res ? "✓" : "x" } Blog:`, blog.slug);
            });

            assert.ok(result);
        });
    });

    // Check emoji incrementing
    describe("Increment Emoji", function() {
        
        // Dynamic emoji testing
        [ "coffee", "thumbsup", "clap" ].forEach(str => {
            it(str, function(done) {
                let blog = blogs[0];
                let emoji = str as Emoji;
    
                db.incrementEmojiCount(blog.slug, emoji)
                    .then(res => {
                        assert.strictEqual(blog[emoji] + 1, res[emoji]);
                        done();
                    })
                    .catch(err => done(err));
            });
        });
        
    });
});