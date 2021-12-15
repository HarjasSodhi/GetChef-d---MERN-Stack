import React from 'react';
import './navbar.css'
import { useContext } from 'react';
import { AuthProvider } from '../../../App';
import { Link } from 'react-router-dom';
import axios from 'axios'

axios.defaults.withCredentials = true
const Navbar = () => {

    let logoutUser = () => {
        axios.get("/api/auth/logout").then(() => {
            sessionStorage.removeItem("user");
            store.setUser(undefined);
        })
    }

    let store = useContext(AuthProvider);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-lg">
                    <Link className="navbar-brand align-item-center" to='/'>
                        <i className="fas fa-glass-martini"></i>
                        <span className="fw-bold text-danger h2">
                            GetChef'd
                        </span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/plans'>Plans</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/dwfwe" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {store.user === undefined ? "Login/Register" : "Profile"}
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    {store.user === undefined ? <li><Link className="dropdown-item" to="/login">Login</Link></li> : ""}
                                    {store.user !== undefined ? <li><div className="dropdown-item" onClick={logoutUser}>Logout</div></li> : ""}
                                    {store.user === undefined ? <li><Link className="dropdown-item" to="/signup">Register</Link></li> : ""}
                                    {store.user !== undefined ? <li><Link className="dropdown-item" to="/profile">My Profile</Link></li> : ""}
                                    {store.user !== undefined ? <li><Link className="dropdown-item" to="/orders">My Orders</Link></li> : ""}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;