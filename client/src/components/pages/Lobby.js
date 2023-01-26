import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
// import { Router } from "@reach/router";
// import jwt_decode from "jwt-decode";

import NotFound from "./NotFound.js";

import "../../utilities.css";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";

/* 
props:
    location.state.user -- userId of the client
    location.state.code -- this is the code of the lobby
*/

const Lobby = (props) => {
  const [playerList, setPlayerList] = useState([]);
  const [gameId, setGameId] = useState(undefined);

  useEffect(() => {
    socket.on("newplayer", (playerIds) => {
      setPlayerList(playerIds);
    });

    socket.on("startgame", (gameDBId) => {
      setGameId(gameDBId);
    });
  }, []);

  useEffect(() => {
    post("/api/joinlobby", { user: props.location.state.user, code: props.location.state.code });
  }, []);

  const startGame = () => {
    post("/api/initgame", { players: playerList, code: props.location.state.code });
  };

  return (
    <div>
      {/* we wrap the whole thing around an "gameId ? TRUE : FALSE" displaying the lobby code and playerlist when TRUE and the <Link> tag when False */}
      {gameId ? (
        <Link
          to="/game"
          state={{
            players: playerList,
            user: props.location.state.user,
            gameId: gameId,
            code: props.location.state.code,
          }}
        >
          Press Here
        </Link>
      ) : (
        <div>
          <p>{props.location.state.code}</p>
          <p>{playerList}</p>
          <button onClick={startGame}>Start</button>
        </div>
      )}
    </div>
  );
};

export default Lobby;
