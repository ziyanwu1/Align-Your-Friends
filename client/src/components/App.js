import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";
import { Link } from "@reach/router";

import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Lobby from "./pages/Lobby.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <div>
        <Link to="/lobby/" className="AppContainer-link">Lobby</Link>
        <Router>
          <Skeleton path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
          <Lobby path="/lobby/" />
          <NotFound default />
        </Router>
      </div>
      
    </>
  );
};

export default App;
