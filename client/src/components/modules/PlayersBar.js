import React, { useEffect } from "react";

import Avatar from "./Avatar.js";

import "./PlayersBar.css";

/*
props:
    players: a list of the players in the game

*/

// an idea: normally avatars have pictures. what if instead they just have a solid block of color so easier
// we can use a useEffect to send api request to the game dictionary to get the colors of the players.

const PlayersBar = (props) => {
  const avatarItems = props.players.map((playerId) => (
    <Avatar playerId={playerId} onClick={props.onClick} />
  ));

  return <div className="PlayersBar-container">{avatarItems}</div>;
};

export default PlayersBar;
