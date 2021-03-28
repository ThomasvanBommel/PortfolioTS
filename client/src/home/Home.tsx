/*
 * File: Home.jsx
 * Created: Sunday March 28th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Sunday March 28th 2021 1:41am
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
                {
                    events.map(event => {
                        if(event.type === "PushEvent"){
                            let push = event as PushEvent;
                            return (
                                <div className={ style.event }>
                                    <p>{ event.type }</p>
                                    <p>{ event.id }</p>
                                    <p><a href={ push.repo.url }>{ push.repo.name }</a></p>
                                    <div>
                                        Commit{ push.payload.commits.length > 1 ? "s" : "" }
                                        { push.payload.commits.map(commit => (
                                            <div className={ style.commit }>
                                                <p>{ commit.sha }</p>
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