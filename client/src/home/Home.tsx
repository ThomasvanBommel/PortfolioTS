/*
 * File: Home.jsx
 * Created: Sunday March 28th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday April 20th 2021 4:16pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-04-20	TvB	Split class into smaller components
 * 2021-04-20	TvB	Added react helmet support
 * 2021-04-16	TvB	Added repository overview showing which repos were modified
 * 2021-04-03	TvB	Updated to use eventTypes
 */

import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { fetchEvents, getEvents, isLoaded as eventsLoaded, } from '../slices/eventSlice';
import { fetchVideos, isLoaded as videosLoaded } from "../slices/videoSlice";
import { Helmet } from "react-helmet";

import Carousel from "../youtube/Carousel";
import style from "./Home.module.css";
import GitHubActivity from "./github/GitHubActivity";

function Home(){
    let dispatch = useDispatch();

    if(!useSelector(videosLoaded))
        dispatch(fetchVideos);

    if(!useSelector(eventsLoaded))
        dispatch(fetchEvents);

    return (
        <div>
            <Helmet>
                <title>Home: vanbommel.ca</title>
                <meta name="description" content="Homepage of vanbommel.ca. All recent activity." />
            </Helmet>
            <Content />
        </div>
    );
}

function Content(){
    const events = useSelector(getEvents);
    let repos: { [key: string]: string } = {};

    for(const event of events)
        if(!(event.repo.name in repos))
            repos[event.repo.name] = event.created_at;

    return (
        <div className={ style.scrollable }>
            <Carousel />
            <GitHubActivity repos={ repos } />
        </div>
    );
}

export default Home;