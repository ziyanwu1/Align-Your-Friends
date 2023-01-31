import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
// import { Router } from "@reach/router";
// import jwt_decode from "jwt-decode";

import NotFound from "./NotFound.js";

import "../../utilities.css";
import "./Lobby.css";

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
    <div className="Lobby-container">
      {/* we wrap the whole thing around an "gameId ? TRUE : FALSE" displaying the lobby code and playerlist when TRUE and the <Link> tag when False */}
      {gameId ? (
        <Link className="boxed"
          to="/game"
          state={{
            players: playerList,
            user: props.location.state.user,
            gameId: gameId,
            code: props.location.state.code,
          }}
        >
          <div className="boxed">
          Start Game!
          </div>
        </Link>
      ) : (
        <div >
          <p>Game code: {props.location.state.code}</p>
          <p>List of players: {playerList}</p>
          <button onClick={startGame}>Continue</button>
        </div>
      )}
    </div>
  );
};

export default Lobby;
