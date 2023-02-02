import React, { useEffect, useState } from "react";

import Avatar from "./Avatar.js";

import "./PlayersBar.css";

import { get } from "../../utilities.js";

/*
props:
    players: a list of the players in the game
    gameId: id of the game
    onClick : an onClick function for the buttons in the playersBar
*/

const PlayersBar = (props) => {
  const [colors, setColors] = useState({});

  useEffect(() => {
    get("/api/colors", {
      gameId: props.gameId,
    }).then((colorDict) => {
      setColors(colorDict);
    });
  }, []);

  const avatarItems = props.players.map((playerId) => (
    <Avatar playerId={playerId} playerColor={colors[playerId]} onClick={props.onClick} />
  ));

  return <div className="PlayersBar-container">{avatarItems}</div>;
};

export default PlayersBar;
