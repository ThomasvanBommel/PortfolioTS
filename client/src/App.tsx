/*
 * Filename: client/src/App.tsx
 * Created Date: Saturday, February 6th 2021, 11:49:28 pm
 * Author: Thomas vanBommel
 * 
 */

import React from 'react';
import Navbar from './Navbar';
import Youtube from './Youtube';

class App extends React.Component {

    /** Create a new application */
    constructor(props: {}) {
        super(props);
    }

    /** Render application */
    render() {
        return (
            <div>
                <Navbar brand="Thomas vanBommel" />
                <Youtube />
            </div>
        );
    }
}

export default App;