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
    players: a list of all the players in the game (players is in the form of an id)

*/

const Game = (props) => {
  const [currentPlayer, setCurrentPlayer] = useState(undefined);

  return (
    <div className="Game-container">
      <PlayersBar players={props.players} onClick={setCurrentPlayer} />
      <Chart currentPlayer={currentPlayer} />
    </div>
  );
};

export default Game;
