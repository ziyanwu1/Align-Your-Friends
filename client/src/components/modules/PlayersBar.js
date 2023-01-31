import React, { useEffect , useState} from "react";

import Avatar from "./Avatar.js";

import "./PlayersBar.css";

import { get } from "../../utilities.js";

/*
props:
    players: a list of the players in the game
    gameId: id of the game

*/

// an idea: normally avatars have pictures. what if instead they just have a solid block of color so easier
// we can use a useEffect to send api request to the game dictionary to get the colors of the players.

const PlayersBar = (props) => {
  const [colors, setColors] = useState({});

  useEffect(() => {
   get("/api/colors", {
      gameId: props.gameId /* this is probably going to come from the prop as well */,
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
