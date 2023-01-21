import React, { useEffect } from "react";

import Navbar from "../modules/Navbar";

import "./Home.css";

const Home = (props) => {
  useEffect(() => {
    document.body.style.backgroundColor = "pink";
  });

  return (
    <div className="Home-container">
      <div className="Home-beginning">
        <Navbar
          handleLogin={props.handleLogin}
          handleLogout={props.handleLogout}
          userId={props.userId}
        />
      </div>

      <div className="Home-body">
        <div className="Home-input">
          <input type="text" id="Home-inputfield" />
        </div>

        <div className="Home-join">
          <button id="Home-joinbutton">Join Game</button>
        </div>
      </div>

      <div className="Home-end">
        <button id="Home-createbutton">Create</button>
      </div>
    </div>
  );
};

export default Home;
