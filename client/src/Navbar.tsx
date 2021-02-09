/*
 * Filename: client/src/Navbar.tsx
 * Created Date: Sunday, February 7th 2021, 12:46:13 am
 * Author: Thomas vanBommel
 * 
 */

class NavBar extends React.Component<{ brand: string }, {}> {

    /** Create a new navigation bar component */
    constructor(props: { brand: string }) {
        super(props);
    }

    /** Render to the canvas */
    render() {
        return (
            <nav className="navbar navbar-expand navbar-light bg-light d-flex border-bottom shadow-sm">
                <a href="/" className="navbar-brand ms-3">
                    { this.props.brand }
                </a>
                <div className="flex-fill"></div>
                <Clock />
                <button type="button" className="btn btn-outline-success me-3">
                    Contact
                </button>
            </nav>
        );
    }
}