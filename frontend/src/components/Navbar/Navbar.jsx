import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../App";
import SignUp from "../../modals/sign-up-modal/sign-up-modal";

import "./navbar.css";

export default function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const RenderNav = () => {
    if (state) {
      return (
        <>
          <nav>
            <ul className="nav-ul">
              <li className="nav-li">
                <NavLink to="/" className="nav-text-dec nav-li-font nav-item-hover">
                  Home
                </NavLink>
              </li>

              <li className="nav-li">
                <NavLink to="/todo" className="nav-text-dec nav-li-font nav-item-hover-sign">
                  Todo
                </NavLink>
              </li>

              <li className="nav-li">
                <NavLink to="/logout" className="nav-text-dec nav-li-font nav-item-hover-logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          </nav>
        </>
      );
    } else {
      return (
        <>
          <nav>
            <ul className="nav-ul">
              <li className="nav-li">
                <NavLink to="/" className="nav-text-dec nav-li-font nav-item-hover">
                  Home
                </NavLink>
              </li>
              <li className="nav-li">
                <NavLink to="/about" className="nav-text-dec nav-li-font nav-item-hover">
                  About
                </NavLink>
              </li>

              <li className="nav-li">
                <NavLink to="/sign-up" className="nav-text-dec nav-li-font nav-item-hover-sign">
                  SignUp
                </NavLink>
              </li>
              <li className="nav-li">
                <NavLink to="/sign-in" className="nav-text-dec nav-li-font nav-item-hover-sign">
                  SignIn
                </NavLink>
              </li>
            </ul>
          </nav>
        </>
      );
    }
  };
  return (
    <>
      <RenderNav />
    </>
  );
}
