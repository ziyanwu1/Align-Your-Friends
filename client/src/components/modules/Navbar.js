import React from "react";

import { Link } from "@reach/router";

import Login from "./Login.js";

import "./Navbar.css";
import "../../utilities.css";

/*
props:
  handleLogin : the login function
  handleLogout : the logout function
  userId : the id of the user
  home : boolean value stating whether or not we are on the home page
*/

const Navbar = (props) => {
  return (
    <nav className="Navbar-container">
      <div className="Navbar-leftside">
        {props.userId ? (
          props.home ? (
            <Link className="Navbar-items" to="/profile" state={{ userId: props.userId }}>
              Profile
            </Link>
          ) : (
            <Link className="Navbar-items" to="/">
              Home
            </Link>
          )
        ) : (
          <div> </div>
        )}
      </div>

      <div className="Navbar-rightside">
        {props.home ? (
          <Login
            handleLogin={props.handleLogin}
            handleLogout={props.handleLogout}
            userId={props.userId}
          />
        ) : (
          <div> </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
