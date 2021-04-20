/*
 * File: GitHubActivity.tsx
 * Created: Tuesday April 20th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday April 20th 2021 9:29am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from 'react';
import { useSelector } from "react-redux";

import { getEvents } from '../../slices/eventSlice';

import Event from "./Event";
import style from "./GitHubActivity.module.css";


function GitHubActivity({ repos }: { repos: { [key: string]: string } }){
    const events = useSelector(getEvents);

    return (
        <div className={ style.container }>
            <h2>Latest GitHub Activity:</h2>
            <div className={ style.overview }>
                {
                    Object.entries(repos).map(([key, val]) => (
                        <p key={ key }>
                            <a href={ `https://github.com/${key}` }>{ key }</a>
                            <span className={ style.right }>{ timeSince(val) }</span>
                        </p>
                    ))
                }
            </div>
            { 
                events.map((event) => 
                    <Event event={ event } key={ event.id.toString() } />) 
            }
        </div>
    );
}

export function timeSince(date: string){
    let time = Date.now() - Date.parse(date);
    let timeUnit = "m";

    time /= 1000; // milliseconds to seconds
    time /= 60; // seconds to minutes
    time = Math.round(time); // round to nearest minute

    if(time >= 60){
        time /= 60; // minutes to hours
        time = Math.round(time); // round to nearest hour
        timeUnit = "h";

        if(time >= 48){
            time /= 24; // hours to days
            time = Math.round(time); // round to nearest day
            timeUnit = "d";
        }
    }

    return `${ time }${ timeUnit } ago`;
}

export default GitHubActivity;