import React, { useEffect, useState, useRef } from "react";

import PlayersBar from "../modules/PlayersBar.js";

import { drawAxes, drawPoints, clearCanvas } from "../../canvasManager.js";
import { Link } from "@reach/router";

import { get, post } from "../../utilities";

import "./OldGame.css";

/*
props:
  location.state.gameId -- id of the game we want to look at
  location.state.userId -- id of the user
*/

const OldGame = (props) => {
  const canvasRef = useRef(undefined);

  const [allPoints, setAllPoints] = useState(undefined); // allPoints will be an object of objects (so use .get() and .set())
  const [trueCoords, setTrueCoords] = useState(undefined);
  const [colors, setColors] = useState(undefined);
  const [chart, setChart] = useState({ left: "t", right: "t", up: "t", down: "t" });
  const [players, setPlayers] = useState(undefined);

  const [canvasCoords, setCanvasCoords] = useState(undefined); // this is coords for what should be drawn to the canvas
  const [seeTruePoints, setSeeTruePoints] = useState(true);

  // GET static data about the game from the database
  useEffect(() => {
    get("/api/getchart", { gameId: props.location.state.gameId }).then((chart) => {
      setChart(chart);
    });

    get("/api/colors", {
      gameId: props.location.state.gameId,
    }).then((colorDict) => {
      setColors(colorDict);
    });

    get("/api/getplayers", { gameId: props.location.state.gameId }).then((players) => {
      setPlayers(players);
    });
  }, []);

  useEffect(() => {
    get("/api/allcoords", { gameId: props.location.state.gameId }).then((coords) => {
      setAllPoints(coords);
    });

    get("/api/truepoints", { gameId: props.location.state.gameId }).then((coords) => {
      setTrueCoords(coords);
    });
  });

  // update the canvas
  useEffect(() => {
    clearCanvas(canvasRef);
    drawAxes(canvasRef);

    if (trueCoords && colors && seeTruePoints) {
      drawPoints(canvasRef, trueCoords, colors);
    } else if (canvasCoords && colors && !seeTruePoints) {
      drawPoints(canvasRef, canvasCoords, colors);
    }
  });

  // handles pressing on player on playerbar
  const handlePlayerClick = (playerId) => {
    if (allPoints) {
      let playerCoords = allPoints[playerId];
      setCanvasCoords(playerCoords);
      setSeeTruePoints(false);
    }
  };

  // handles pressing the true chart button
  const handleTrueClick = () => {
    setSeeTruePoints(true);
  };

  return (
    <div className="End-container">
      {players ? (
        <PlayersBar
          players={players}
          gameId={props.location.state.gameId}
          onClick={handlePlayerClick}
        />
      ) : (
        <div> </div>
      )}
      <div className="End-chartContainer">
        <p>{chart.up}</p>
        <div className="End-chartMiddle">
          <p>{chart.left}</p>
          <div>
            <canvas ref={canvasRef} className="End-canvas" width="500px" height="500px"></canvas>
          </div>
          <p>{chart.right}</p>
        </div>
        <p>{chart.down}</p>
      </div>

      <div className="End-topBar">
        <button onClick={handleTrueClick}>True Chart</button>
      </div>

      <div className="End-facts"></div>
      <Link to="/profile" state={{ userId: props.location.state.userId }}>
        <button>Done</button>
      </Link>
    </div>
  );
};

export default OldGame;
