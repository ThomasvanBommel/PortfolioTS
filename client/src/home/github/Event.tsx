/*
 * File: Event.tsx
 * Created: Tuesday April 20th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday April 20th 2021 9:26am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from 'react';

import { 
    Event, 
    PushEvent, 
    DeleteEvent, 
    CreateEvent, 
    IssuesEvent, 
    IssueCommentEvent 
} from "../../slices/eventTypes";
import { timeSince } from "./GitHubActivity";

import style from "./Event.module.css";

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

            case "IssuesEvent":
                return <IssuesEventElement event={ event as IssuesEvent } />

            case "IssueCommentEvent":
                return <IssueCommentEventElement event={ event as IssueCommentEvent } />

            default:
                return null;
        }
    }

    return (
        <div className={ style.event }>
            <div className={ style.header }>
                <div>
                    <p>{ event.type }</p>
                    <p><a href={ cleanURL(event.repo.url) }>{ event.repo.name }</a></p>
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
                    <p><a href={ cleanURL(commit.url) }>{ commit.sha.slice(0, 7) }</a></p>
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

function IssuesEventElement({ event }: { event: IssuesEvent }){
    return (
        <p>
            <br/>{ capFirstLetter(event.payload.action) } issue <b>{ event.payload.issue.title }</b>
        </p>
    );
}

function IssueCommentEventElement({ event }: { event: IssueCommentEvent }){
    return (
        <div>
            <br/>
            <p>
                { capFirstLetter(event.payload.action) } comment on issue
                <b>&nbsp;{ event.payload.issue.title }</b>
            </p>
            <p>"{ event.payload.comment.body }"</p>
        </div>
    );
}

function capFirstLetter(input: string){
    return `${ input.charAt(0).toUpperCase() }${ input.slice(1) }`;
}

function cleanURL(str: string){
    return str.replace(/\/\/api./g, "//").replace(/\/repos\//g, "/");
}

export default EventElement;