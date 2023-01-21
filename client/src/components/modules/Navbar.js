import React from "react";

import Login from "./Login.js";

import "./Navbar.css";
import "../../utilities.css";

const Navbar = ({ handleLogin, handleLogout, userId }) => {
  return (
    <nav className="Navbar-container">
      <div className="Navbar-leftside">
        <button className="Navbar-items">Home</button>
        <button className="Navbar-items">Useless Button</button>
      </div>

      <div className="Navbar-rightside">
        <Login handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      </div>
    </nav>
  );
};

export default Navbar;
