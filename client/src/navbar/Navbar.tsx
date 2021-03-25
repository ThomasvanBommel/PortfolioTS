/*
 * File: Navbar.tsx
 * Created: Sunday February 14th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday March 25th 2021 1:15am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-24	TvB	Added support for redux store
 * 2021-03-16	TvB	Refactor to use react function components
 * 2021-03-15	TvB	Updated change-log format
 * 2021-03-13	TvB	Added click callback + contactPageActive state
 */

import React, { useState } from 'react';
// import { Page } from '../App';
import style from "./Navbar.module.css";

import { useDispatch, useSelector, useStore } from "react-redux";
import { RootState } from "../store";
import { getPage, setPage, Page } from "../pageReducer";
// import { Store } from "redux";
// import { PageState, PageAction, Page, setPage } from "../pageReducer";

// import pageReducer, { setPage, Page } from "../pageReducer";
// import { dis } from "@reduxjs/toolkit";
// import { StoreType } from "../App";

/** Navbar */
// function NavBar({ activePage, setActivePage }
//     : { activePage: Page, setActivePage: React.Dispatch<React.SetStateAction<Page>> }){

function NavBar(){
    
    // Check which page we're on
    // const isContactPage = activePage === Page.Contact;
    // const prevPage = isContactPage ? Page.Home : activePage;

    // Handle change page button click
    // const handleClick = () => {
    //     if(!isContactPage)
    //         return setActivePage(Page.Contact);

    //     setActivePage(prevPage);
    // };

    // const page = store.getState().page;


    // const page = useStore().getState() as RootState;
    let page = useSelector(getPage);
    const disbatch = useDispatch();

    console.log("CURRENT PAGE", String(page));

    function handleChange(){
    }

    function handleClick(){
        let nextPage: Page;

        // console.log("~~PAGE", String(page));
        // console.log("~~PAGE", page === Page.Contact);

        if(page === Page.Contact){
            nextPage = Page.Home;
            // disbatch({ ...setPage(), page: Page.Contact });
        }else{
            nextPage = Page.Contact;
            // disbatch({ ...setPage(), page: Page.Home });
        }

        // console.log("NEXT PAGE", String(nextPage));

        // console.log(setPage());

        disbatch({ ...setPage(), payload: nextPage });
        // let state = pageReducer({ page: Page.Contact }, setPage());

        // console.log(state);
        // console.log(setPage());
        // if(page === Page.Contact){

        //     // setPage(store, Page.Home);
        // }else{
        //     setPage(store, Page.Contact);
        // }
    }

    return (
        <nav className={ style.nav }>
            <div>
                <a href="/">Thomas v<span>an</span>B<span>ommel</span></a>

                <div className={ style.spacer }></div>

                <button type="button" onClick={ handleClick }>
                    Contact
                    {/* { page === Page.Contact ? "Back" : "Contact" } */}
                </button>
            </div>
        </nav>
    );
}

export default NavBar;