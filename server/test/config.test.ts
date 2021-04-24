/*
 * Filename: test/server/src/config.test.ts
 * Created Date: Friday, March 5th 2021, 11:53:11 am
 * Author: Thomas vanBommel
 * 
 */

import config from "../../common/config.json";

describe("config", () => {

    // Check if the properties exist
    describe("check config properties", () => {

        // Check that channelId exists and is not empty
        test(".channelId", () => {
            expect(!!config.channelId).toBeTruthy();
        });

        // Check that port exists and is not 0
        test(".port", () => {
            expect(!!config.port).toBeTruthy();
        });

        // Check that host exists and is not empty
        test(".host", () => {
            expect(!!config.host).toBeTruthy();
        });
    });

    // Check the properties type
    describe("type-check config properties", () => {

        // Check that channelId is a string type
        test(".channelId", () => {
            expect(typeof config.channelId).toBe("string");
        });

        // Check that port is a number type
        it(".port", () => {
            expect(typeof config.port).toBe("number");
        });

        // Check that host is a string type
        it(".host", () => {
            expect(typeof config.host).toBe("string");
        });
    });
});