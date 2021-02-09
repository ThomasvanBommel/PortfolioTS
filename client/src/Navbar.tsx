/*
 * Filename: client/src/Navbar.tsx
 * Created Date: Sunday, February 7th 2021, 12:46:13 am
 * Author: Thomas vanBommel
 * 
 */

const Navbar = () => {
    return  <nav className="navbar navbar-expand navbar-light bg-light d-flex border-bottom shadow-sm">
                <a href="/" className="navbar-brand ms-3">
                    Thomas vanBommel
                </a>
                <div className="flex-fill"></div>
                <button type="button" className="btn btn-outline-success me-3">Contact</button>
            </nav>
};