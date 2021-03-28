/*
 * File: database.ts
 * Created: Sunday March 28th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Sunday March 28th 2021 1:43pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import knex from "knex";

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
                    table.text("title");
                    table.text("article");
                    table.integer("coffee");
                    table.integer("thumbsup");
                    table.integer("clap");
                });

                console.log("Created blogs table");

                await this.db("blogs").insert({
                    title: "Testing...",
                    article: "Welcome to my new blog!",
                    coffee: 0,
                    thumbsup: 0,
                    clap: 0
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
            return this.db("blogs").select("*");

        return [];
    }
}