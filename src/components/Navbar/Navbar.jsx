import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
    const [hover, setHover] = useState(false);
    return (
        <>
            <nav>
                <ul className="nav-ul">
                    <li className="nav-li">
                        <NavLink to="/" 
                        className = "nav-text-dec nav-li-font nav-item-hover">

                            Home
                        </NavLink>
                    </li>
                    <li className="nav-li">
                        <NavLink to="/about"
                        className = "nav-text-dec nav-li-font nav-item-hover"
                        >
                            About
                        </NavLink>
                    </li>
                    
                    <li className="nav-li">
                        <NavLink to="/contactUs"
                        className = "nav-text-dec nav-li-font nav-item-hover"
                        >
                            Contact Us
                        </NavLink>
                    </li>

                    <li className="nav-li">
                        <NavLink to="/contactUs"
                        className = "nav-text-dec nav-li-font nav-item-hover-sign"
                        >
                            SignIn
                        </NavLink>
                    </li>

                    <li className="nav-li">
                        <NavLink to="/contactUs"
                        className = "nav-text-dec nav-li-font nav-item-hover-sign"
                        >
                            SignUp
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );

}
