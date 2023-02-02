import React, { useEffect, useState } from "react";

import PlayersBar from "../modules/PlayersBar.js";
import Chart from "../modules/Chart.js";

import "./Game.css";

/*
props:
    location.state.players: a list of all the players in the game (players is in the form of an userId)
    location.state.user: the userId of the current user
    location.state.gameId:
    location.state.code : the socket room code
*/

const Game = (props) => {
  const [currentPlayer, setCurrentPlayer] = useState(props.user);

  useEffect(() => {
    document.body.style.backgroundColor = "#edf6ff";
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);

  return (
    <div className="Game-container">
      <PlayersBar
        players={props.location.state.players}
        gameId={props.location.state.gameId}
        onClick={setCurrentPlayer}
      />
      <Chart
        currentPlayer={currentPlayer}
        user={props.location.state.user}
        gameId={props.location.state.gameId}
        code={props.location.state.code}
      />
    </div>
  );
};

export default Game;
