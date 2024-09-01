import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <nav className="navbar navbar-light bg-light mb-3">
            <Link to="/">
                <span className="navbar-brand mb-0 h1">CONTACT LIST</span>
            </Link>
            <div className="ml-auto d-flex">
                {!isLoggedIn && (
                    <Link to="/register" className="nav-link">Registrarse</Link>
                )}
                {!isLoggedIn && (
                    <Link to="/login" className="nav-link">Login</Link>
                )}
                {isLoggedIn && (
                    <Link to="/logout" className="nav-link">Logout</Link>
                )}
            </div>
        </nav>
    );
};