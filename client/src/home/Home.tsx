/*
 * File: Home.jsx
 * Created: Sunday March 28th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday March 30th 2021 11:59pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents, getEvents, Event, PushEvent, isLoaded as eventsLoaded, DeleteEvent, CreateEvent } from '../slices/eventSlice';
import { fetchVideos, isLoaded as videosLoaded } from "../slices/videoSlice";

import Carousel from "../youtube/Carousel";
import style from "./Home.module.css";

function Home(){
    let dispatch = useDispatch();

    if(!useSelector(videosLoaded))
        dispatch(fetchVideos);

    if(!useSelector(eventsLoaded))
        dispatch(fetchEvents);

    return <Content />;
}

function Content(){
    const events = useSelector(getEvents);

    return (
        <div className={ style.scrollable }>
            <Carousel />
            
            <div className={ style.container }>
                <h2>Latest GitHub Activity:</h2>
                { 
                    events.map(event => 
                        <EventElement event={ event } key={ event.id.toString() } />
                    ) 
                }
            </div>
        </div>
    );
}

function EventElement({ event }: { event: Event }){
    let time = timeSince(event.created_at);

    function content(){
        switch(event.type){
            case "PushEvent":
                return <PushEventElement event={ event as PushEvent } />

            case "DeleteEvent":
                return <DeleteEventElement event={ event as DeleteEvent } />

            case "CreateEvent":
                return <CreateEventElement event={ event as CreateEvent } />

            default:
                return null;
        }
    }

    return (
        <div className={ style.event }>
            <div className={ style.header }>
                <div>
                    <p>{ event.type }</p>
                    <p><a href={ event.repo.url }>{ event.repo.name }</a></p>
                </div>
                <div className={ style.spacer }></div>
                <div>
                    <p>{ new Date(event.created_at).toLocaleDateString() }<br/></p>
                    <p>{ time }</p>
                </div>
            </div>
            { content() }
        </div>
    );
}

function PushEventElement({ event }: { event: PushEvent }){
    return (
        <div className={ style.commitContainer }>
            Commit{ event.payload.commits.length > 1 ? "s" : "" }:
            { event.payload.commits.map(commit => (
                <div className={ style.commit }>
                    <p><a href={ commit.url }>{ commit.sha.slice(0, 7) }</a></p>
                    <p>{ commit.message }</p>
                </div>
            )) }
        </div>
    );
}

function CreateEventElement({ event }: { event: CreateEvent }){
    return (
        <p><br/>Created { event.payload.ref_type } <b>{ event.payload.ref }</b></p>
    );
}

function DeleteEventElement({ event }: { event: DeleteEvent }){
    return (
        <p><br/>Deleted { event.payload.ref_type } <b>{ event.payload.ref }</b></p>
    );
}

function timeSince(date: string){
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

export default Home;