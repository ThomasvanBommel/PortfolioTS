/*
 * Filename: server/src/test.ts
 * Created Date: Saturday, February 13th 2021, 10:38:36 pm
 * Author: Thomas vanBommel
 * 
 */

import YouTube from "./youtube";

export type FinishedCallback = () => void;

export default class Testing {
    yt: YouTube;

    /**
     * Create a new Testing object
     * @param yt Youtube object initialized with API key + id
     */
    constructor(yt: YouTube) {
        this.yt = yt;
    }

    /**
     * Run all available tests
     * @param finished Callback for when all is successful
     */
    testAll(finished: FinishedCallback) {
        // ytAPI
        this.ytAPI();

        // all done, everything was successful
        finished();
    }

    /**
     * Throw an error and exit the program with exit code 1
     * @param msg Error message to display on the terminal
     */
    error(msg: string) {
        console.error("❌ Error:", msg);
        process.exit(1);
    }

    /**
     * Write a success message to the terminal
     * @param msg Success message to display on the terminal
     */
    success(msg: string) {
        console.log("✅ Success:", msg);
    }

    /**
     * Test a request to Youtube using an API key
     * pass if response code is 200
     */
    ytAPI() {
        this.yt.test(success => {
            if(!success)
                return this.error("Youtube API request response code is not 200");

            this.success("Youtube API request");
        });
    }
}