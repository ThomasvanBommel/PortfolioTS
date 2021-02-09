/*
 * Filename: client/src/App.tsx
 * Created Date: Saturday, February 6th 2021, 11:49:28 pm
 * Author: Thomas vanBommel
 * 
 */

/// <reference path="Navbar.tsx" />

class App extends React.Component {

    /** Create a new application */
    constructor(props: {}) {
        super(props);
    }

    /** Render application */
    render() {
        return (
            <NavBar brand="Thomas vanBommel" />
        );
    }
}