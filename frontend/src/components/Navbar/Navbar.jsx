import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import SignIn from "../../modals/sign-in-modal/sign-in-modal.jsx";
import "./navbar.css";

export default function Navbar() {
    const [isModalOpen, setModalOpen] = useState(false);
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
                        <NavLink to="/contact-us"
                        className = "nav-text-dec nav-li-font nav-item-hover"
                        >
                            Contact Us
                        </NavLink>
                    </li>
                    <li className="nav-li">
                        <NavLink to="/sign-up"
                        className = "nav-text-dec nav-li-font nav-item-hover-sign"
                        >
                            SignUp
                        </NavLink>
                    </li>
                    <li className="nav-li">
                        <NavLink to="/sign-in"
                        className = "nav-text-dec nav-li-font nav-item-hover-sign"
                        onClick = {() => {setModalOpen(true)}}
                        >
                            SignIn
                        </NavLink>
                        <SignIn open = {isModalOpen} />
                    </li>
                    </ul>
            </nav>
        </>
    );

}
