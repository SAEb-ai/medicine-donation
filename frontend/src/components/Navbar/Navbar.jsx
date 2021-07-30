import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SignUp from "../../modals/sign-up-modal/sign-up-modal";

import "./navbar.css";

export default function Navbar() {
    const [show, setShow] = useState(false);
    return (
        <>
            <nav>
                <ul className="nav-ul">
                    <li className="nav-li">
                        <NavLink to="/"
                            className="nav-text-dec nav-li-font nav-item-hover">

                            Home
                        </NavLink>
                    </li>
                    <li className="nav-li">
                        <NavLink to="/about"
                            className="nav-text-dec nav-li-font nav-item-hover"
                        >
                            About
                        </NavLink>
                    </li>

                    <li className="nav-li">
                        <NavLink to="/contact-us"
                            className="nav-text-dec nav-li-font nav-item-hover"
                        >
                            Contact Us
                        </NavLink>
                    </li>
                    <li className="nav-li">
                        <NavLink to="/sign-up"
                            className="nav-text-dec nav-li-font nav-item-hover-sign"
                            onClick={()=>setShow(true)}
                        >
                            SignUp
                        </NavLink>
                        <SignUp show={show}/>

                    </li>
                    <li className="nav-li">
                        <NavLink to="/sign-in"
                            className="nav-text-dec nav-li-font nav-item-hover-sign"

                        >
                            SignIn
                        </NavLink>

                    </li>
                    <li className="nav-li">
                        <NavLink to="/admin"
                            className="nav-text-dec nav-li-font nav-item-hover-admin"
                        >
                            Admin
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );

}
