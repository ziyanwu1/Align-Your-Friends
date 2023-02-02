import React, { useEffect, useState } from "react";

import Navbar from "../modules/Navbar";
import { Link } from "@reach/router";

import { socket } from "../../client-socket.js";

import "./Home.css";

/*
props:
  handleLogin : callback function that handles login
  handleLogout : callback function that handles logout
  user : contains the user's id

*/

const Home = (props) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = "#edf6ff";
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className="Home-container">
      <div className="Home-beginning">
        <Navbar
          handleLogin={props.handleLogin}
          handleLogout={props.handleLogout}
          userId={props.user}
          home={true}
        />
      </div>
      {props.user ? (
        <div className="Home-body">
          <div className="Home-input">
            <input
              type="text"
              id="Home-inputfield"
              value={input}
              onChange={handleChange}
              placeholder="Enter Code Here!"
            />
          </div>

          <div className="Home-join">
            <Link id="Home-joinbutton" to="/lobby" state={{ user: props.user, code: input }}>
              Join Game
            </Link>
          </div>

          <div className="Home-end">
            <Link id="Home-createbutton" to="/lobby" state={{ user: props.user, code: props.user }}>
              Create
            </Link>
          </div>
        </div>
      ) : (
        <div className="Home-notLogged">
          <p> Log in first! </p>
        </div>
      )}
    </div>
  );
};

export default Home;
