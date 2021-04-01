/*
 * File: database.ts
 * Created: Sunday March 28th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday April 1st 2021 12:52pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import knex from "knex";
import { makeSlug } from "../../common/slug";

export default class Database{

    db = knex({
        client: "sqlite3",
        connection: {
            filename: "./sqlite.db"
        },
        useNullAsDefault: true
    });

    isSetup = false;

    constructor(){
        this.setup();
    }

    async setup(){
        try{
            if(! await this.db.schema.hasTable("blogs")){
                await this.db.schema.createTable("blogs", table => {
                    table.increments("id");
                    table.text("slug").notNullable();
                    table.text("title").notNullable();
                    table.text("article").notNullable();
                    table.integer("coffee").defaultTo(0);
                    table.integer("thumbsup").defaultTo(0);
                    table.integer("clap").defaultTo(0);

                    table.unique(["slug"]);
                });

                console.log("Created blogs table");

                await this.db("blogs").insert({
                    title: "Testing...",
                    article: "Welcome to my new blog!",
                    slug: makeSlug("Testing...")
                });

                console.log("Inserted test article");
            }

            this.isSetup = true;
        }catch(error) {
            console.error(error);
        }
    }

    // Get list of all blogs
    async blogs(){
        if(this.isSetup)
            return this.db.select("*").from("blogs");

        return [];
    }

    // Incrmenet blogs emoji count
    async incrementEmojiCount(slug: string, emoji: "coffee" | "thumbsup" | "clap"){
        // Ensure database is setup and functioning
        if(!this.isSetup) 
            return new Error("Database is not setup. Try again later");

        try{
            // increment emoji count
            await this.db("blogs").where({ slug: slug }).increment(emoji);

            // return blog object
            return await this.db("blogs").select("*").where({ slug: slug });
        }catch(error){
            return new Error(error);
        }
    }
}