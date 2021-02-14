/*
 * Filename: server/src/request.ts
 * Created Date: Tuesday, February 9th 2021, 9:19:41 pm
 * Author: Thomas vanBommel
 * 
 */

import https from "https";
import http from "http";

type RequestOptions = {
    host: string,
    path: string,
    parameters?: { [key: string]: string },
    headers?: { [key: string]: string }
    method?: "GET" | "POST"
};

export type RequestCallback = (err: Error | undefined, res?: http.IncomingMessage) => void;
type AccumulatorCallback = (err: Error | undefined, res?: http.IncomingMessage, data?: string) => void;

/** Send request */
export default function request(options: RequestOptions, callback: RequestCallback) {
    let path = options.path + "?";

    for(let key in options.parameters)
        path += `${ key }=${ options.parameters[key] }&`;

    const req = https.request({
        hostname: options.host,
        path: path,
        method: options.method,
        headers: options.headers
    }, res => callback(undefined, res));

    req.on("error", err => callback(err));
    req.end();
}

/** Accumulator for response data */
export function accumulator(callback: AccumulatorCallback): RequestCallback {
    return (err, res) => {
        if(!res) return callback(err);

        let data = "";

        res.on("data", d => data += d);
        res.on("end", () => callback(undefined, res, data));
    };
}