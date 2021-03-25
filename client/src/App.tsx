/*
 * File: App.tsx
 * Created: Saturday February 6th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Thursday March 25th 2021 12:43am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-24	TvB	Added redux store support
 * 2021-03-15   TvB	Refactored to use a function component
 * 2021-03-13	TvB	Added contact click callback
 * 2021-03-13	TvB	Updated header + Change import location
 */

import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import YoutubeCarousel from './youtube/YoutubeCarousel';
import ContactForm from './contact/ContactForm';
import Carousel from "./youtube/Carousel2";
import ProgressBanner from "./progress_banner/ProgressBanner";

// import store from 
import { Provider } from "react-redux";
import { Page } from "./pageReducer";
// import { createStore } from "redux";
import store from "./store";

// export enum Page {
//     Home = "Home", 
//     Contact = "Contact"
// };

// const store = createStore(
//     pageReducer,
//     // @ts-ignore
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );



function App(){
    // const [ activePage, setActivePage ] = useState(Page.Home);

    // Temporary until navbar is refactored
    // const handleContactClick = () => {
    //     setActivePage(activePage === Page.Home ? Page.Contact : Page.Home);
    // };


    return (
        <Provider store={ store }>
            <Navbar />
            <ProgressBanner />
            {
                store.getState().page.page === Page.Home ? (
                    <div>
                        <Carousel />
                    </div>
                ) : (
                    <ContactForm />
                )
            }
        </Provider>
    );
}

export default App;