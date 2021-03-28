/*
 * File: Home.jsx
 * Created: Sunday March 28th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Sunday March 28th 2021 11:57am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import React from 'react';
import { fetchEvents, getEvents, PushEvent } from '../slices/eventSlice';
import { Provider, useSelector, useDispatch } from "react-redux";

import Carousel from "../youtube/Carousel";
import style from "./Home.module.css";

function Home(){
    const events = useSelector(getEvents);

    return (
        <div className={ style.scrollable }>
            <Carousel />
            <div className={ style.container }>
                <h2>Latest GitHub Activity:</h2>
                {
                    events.map(event => {
                        if(event.type === "PushEvent"){
                            let push = event as PushEvent;
                            let time = Date.now() - Date.parse(push.created_at);
                            let timeUnit = "h";

                            time /= 1000; // milliseconds to seconds
                            time /= 60; // seconds to minutes
                            time /= 60; // minutes to hours
                            time = Math.round(time); // round to nearest hour

                            if(time >= 48){
                                time /= 24;
                                timeUnit = "d";
                            }

                            return (
                                <div className={ style.event }>
                                    <div className={ style.header }>
                                        <div>
                                            <p>{ event.type }</p>
                                            <p><a href={ push.repo.url }>{ push.repo.name }</a></p>
                                        </div>
                                        <div className={ style.spacer }></div>
                                        <div>
                                            <p>{ new Date(push.created_at).toLocaleDateString() }<br/></p>
                                            <p>{ time }{ timeUnit } ago</p>
                                        </div>
                                    </div>
                                    <div className={ style.commitContainer }>
                                        Commit{ push.payload.commits.length > 1 ? "s" : "" }:
                                        { push.payload.commits.map(commit => (
                                            <div className={ style.commit }>
                                                <p><a href={ commit.url }>{ commit.sha.slice(0, 7) }</a></p>
                                                <p>{ commit.message }</p>
                                            </div>
                                        )) }
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div className={ style.event }>
                                <p>{ event.type }</p>
                                <p>{ event.id }</p>
                                {/* <div>{JSON.stringify(event)}</div> */}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Home;