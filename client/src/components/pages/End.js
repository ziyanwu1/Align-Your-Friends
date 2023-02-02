import React, { useState, useEffect, useRef } from "react";

import { drawAxes, drawPoints, clearCanvas } from "../../canvasManager.js";
import { socket } from "../../client-socket.js";
import { Link } from "@reach/router";
import PlayersBar from "../modules/PlayersBar.js";

import { get, post } from "../../utilities";

import "./End.css";
/*
props:
    location.state.gameId -- gives us the id of the game on the database
    location.state.user -- gives us the id of the user
    location.state.coords -- gives us the coordinates that was submitted by the user on the Game page
    location.state.code -- gives us the lobby code that started this game
*/

const End = (props) => {
  const canvasRef = useRef(undefined);

  const [allPoints, setAllPoints] = useState(undefined); // allPoints will be an object of objects (so use .get() and .set())
  const [trueCoords, setTrueCoords] = useState(undefined);
  const [colors, setColors] = useState(undefined);
  const [chart, setChart] = useState({ left: "t", right: "t", up: "t", down: "t" });
  const [players, setPlayers] = useState(undefined);

  const [canvasCoords, setCanvasCoords] = useState(undefined); // this is coords for what should be drawn to the canvas
  const [seeTruePoints, setSeeTruePoints] = useState(true);

  // initialize background color
  useEffect(() => {
    document.body.style.backgroundColor = "#edf6ff";
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);

  // initialize sockets to capture new results from other players
  useEffect(() => {
    socket.on("newtruepoint", (coords) => {
      setTrueCoords(coords);
    });

    socket.on("newallpoints", (allPoints) => {
      setAllPoints(allPoints);
    });
  }, []);

  // update the database with your plotted coordinates from Game
  useEffect(() => {
    post("/api/updategame", {
      user: props.location.state.user,
      coords: props.location.state.coords,
      gameId: props.location.state.gameId,
      code: props.location.state.code,
    });
  }, []);

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

      <div className="End-trueContainer">
        <button id="End-trueButton" onClick={handleTrueClick}>
          True Chart
        </button>
      </div>
      <div className="End-doneContainer">
        <Link id="End-doneButton" to="/">
          Done
        </Link>
      </div>
    </div>
  );
};

export default End;
