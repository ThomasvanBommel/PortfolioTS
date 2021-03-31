/*
 * File: database.ts
 * Created: Sunday March 28th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday March 30th 2021 11:36pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import knex from "knex";
import { makeSlug } from "../../common/slug";
// const { makeSlug } = require("../../common/slug");


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

    async blogs(){
        if(this.isSetup)
            return this.db.select("*").from("blogs");

        return [];
    }
}