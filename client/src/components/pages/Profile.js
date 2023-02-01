import React, { useEffect, useState } from "react";

import Navbar from "../modules/Navbar.js";

import { get, post } from "../../utilities.js";

import "./Profile.css";

/*
props:
    location.state.userId : the userId of the person

*/

const Profile = (props) => {
  // useEffect to GET the name of the user
  // useEffect to GET the list of past games of the user
  //     -- doing the api call for getting the games should be easy
  //     -- when doing the api call for adding a game to a user, use [NEW ELEMENT HERE].concat(array) to have most recent games on top
  const [name, setName] = useState("");
  const [pastGames, setPastGames] = useState([]);

  useEffect(() => {
    get("/api/user", { userId: props.location.state.userId }).then((document) => {
      setName(document.name);
      setPastGames(document.pastgames);
    });
  });

  const listOfPastGames = pastGames.map((gameId) => {
    <Link to="/oldgame" state={{ gameId: gameId }}>
      {gameId}
    </Link>;
  });

  return (
    <div>
      <Navbar userId={props.location.state.userId} home={false} />
      <div>{name}'s Profile</div>
      <div>{listOfPastGames}</div>
    </div>
  );
};

export default Profile;
