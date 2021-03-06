/*
 * Filename: server/src/request2.ts
 * Created Date: Saturday, March 6th 2021, 4:58:37 pm
 * Author: Thomas vanBommel
 * 
 */

import https from "https";
import http from "http";

export type RequestOptions = {
    hostname: string,
    path: string,

    parameters?: { [key: string]: string | number },
    headers?: { [key: string]: string | number },
    protocol?: "HTTP" | "HTTPS",
    method?: "GET" | "POST",
    port?: number
};

export type RequestResponse = {
    message: http.IncomingMessage,
    data: string
};

/**
 * 
 * @param options { String | RequestOptions } - HTTPS request options or URL string
 * @returns { Promise<RequestResponse> } - Request promise
 */
async function request(options: string | RequestOptions): Promise<RequestResponse> {

    // Check if options is just a URL
    if(typeof options !== "string"){

        // Add '?' to end of path, we're going to add parameters
        options.path += "?";

        // Add parameters to the path in the order 'key=value&'
        if(options.parameters)
            for(const [key, value] of Object.entries(options.parameters))
                options.path += `${key}=${value}&`
    }

    // Return a promise containing our request
    return new Promise((resolve, reject) => {

        // Create request
        const request = https.request(options, response => {
            let data = "";

            // Accumulate data from each event until 'end'
            response.on("data", info => data += info);
            response.on("end", () => {

                // Return the request response
                resolve({
                    message: response,
                    data: data
                })
            });
        });

        // Error handling
        request.on("error", reject);

        // Send request
        request.end();
    });
}

export default request;