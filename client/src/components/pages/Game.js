import React, { useEffect, useState } from "react";

import PlayersBar from "../modules/PlayersBar.js";
import Chart from "../modules/Chart.js";

import "./Game.css";

/*
what do i need for the game when i start it?

- the number of players
- who the players are probably (to make the PlayersBar)
    -- this can probably be done with either useEffect() or props when we link the users from the lobby to the game itself 


*/

/*
props:
    location.state.players: a list of all the players in the game (players is in the form of an userId)
    location.state.user: the userId of the current user
    location.state.gameId:
    location.state.code : the socket room code
*/

const Game = (props) => {
  const [currentPlayer, setCurrentPlayer] = useState(props.user);

  return (
    <div className="Game-container">
      <PlayersBar players={props.location.state.players} onClick={setCurrentPlayer} />
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
