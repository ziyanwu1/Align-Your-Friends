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
      <div>{name}'s Profile</div>
      <div>{listOfPastGames}</div>
    </div>
  );
};

export default Profile;
