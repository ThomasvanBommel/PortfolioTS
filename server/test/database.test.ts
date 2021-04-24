/*
 * File: database.test.ts
 * Created: Thursday April 22nd 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 24th 2021 5:46pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-04-24	TvB	Modified for jest
 */

import { isBlog, Blog, Emoji } from "../../common/types";
import Database from "../src/database";

describe("Database", () => {
    let db: Database = new Database(false);
    let blogs: Blog[] = [];

    beforeAll(async () => {
        await db.setup();
        blogs = await db.blogs();
    });

    // Ensure setup
    test("setup", () => {
        expect(db.isSetup).toBeTruthy();
    });

    // Fetch blogs
    test("fetch blogs", () => {
        expect(blogs.length).toBeGreaterThan(0);
    });

    // Check if each blog *is* a blog
    test("isBlog()", () => {
        expect.assertions(blogs.length);

        blogs.forEach(blog => {
            expect(isBlog(blog)).toBeTruthy();
        });
    });

    // Check that the increment method is working
    test.each([ "coffee", "thumbsup", "clap" ])("incrementEmojiCount(%s)", async (emoji) => {
        const blog = blogs[0];
        expect.assertions(1);

        expect(
            (await db.incrementEmojiCount(blog.slug, emoji as Emoji))[emoji as keyof Blog]
        ).toBe(Number(blog[emoji as keyof Blog]) + 1);
    });
});