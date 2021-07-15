import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
    return (
        <>
            <nav>
                <ul className="nav-ul">
                    <li className="nav-li">
                        <NavLink to="/" className="nav-text-dec nav-li-font">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-li">
                        <NavLink to="/about" className="nav-text-dec nav-li-font">
                            About
                        </NavLink>
                    </li>
                    <li className="nav-li">
                        <NavLink to="/contactUs" className="nav-text-dec nav-li-font">
                            Contact Us
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );

}
