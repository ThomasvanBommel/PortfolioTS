/*
 * File: slug.ts
 * Created: Monday March 29th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Monday March 29th 2021 10:41pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

export function makeSlug(input: string){
    return encodeURI(
        input
        .replace(/[^\w|\d]/g, "-")
        .replace(/-+$/g, "")
        .replace(/--/g, "")
        .toLowerCase()
    );
}