import React, { useEffect, useState } from "react";

import Navbar from "../modules/Navbar.js";

import { Link } from "@reach/router";
import { get, post } from "../../utilities.js";

import "./Profile.css";

/*
props:
    location.state.userId : the userId of the person

*/

const Profile = (props) => {
  const [name, setName] = useState("");
  const [pastGames, setPastGames] = useState([]);

  // initialize background color
  useEffect(() => {
    document.body.style.backgroundColor = "#edf6ff";
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);

  useEffect(() => {
    get("/api/user", { userId: props.location.state.userId }).then((document) => {
      setName(document.name);
      setPastGames(document.pastgames);
    });
  }, []);

  const listOfPastGames = pastGames.map((gameId) => (
    <div>
      <Link to="/oldgame" state={{ gameId: gameId, userId: props.location.state.userId }}>
        {gameId}
      </Link>
    </div>
  ));

  return (
    <div>
      <Navbar userId={props.location.state.userId} home={false} />
      <div className="Profile-title">
        <h1>{name}'s Past Game History</h1>
      </div>
      <div className="Profile-title">
        <h3>(Games are sorted from most recent to least recent)</h3>
      </div>
      <div className="Profile-linkContainer">{listOfPastGames}</div>
    </div>
  );
};

export default Profile;
