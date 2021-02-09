/*
 * Filename: client/src/Navbar.tsx
 * Created Date: Sunday, February 7th 2021, 12:46:13 am
 * Author: Thomas vanBommel
 * 
 */

const Navbar = (props: { brand: string }) => {
    return  <nav className="navbar navbar-expand navbar-light bg-light d-flex border-bottom shadow-sm">
                <a href="/" className="navbar-brand ms-3">
                    { props.brand }
                </a>
                <div className="flex-fill"></div>
                <Clock />
                <button type="button" className="btn btn-outline-success me-3">Contact</button>
            </nav>
};