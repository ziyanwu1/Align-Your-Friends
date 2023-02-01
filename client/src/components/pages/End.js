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

  const [trueCoords, setTrueCoords] = useState(undefined);
  const [colors, setColors] = useState(undefined);
  const [chart, setChart] = useState({ left: "t", right: "t", up: "t", down: "t" });
  const [players, setPlayers] = useState(undefined);

  useEffect(() => {
    socket.on("newtruepoint", (coords) => {
      setTrueCoords(coords);
    });
  }, []);

  useEffect(() => {
    post("/api/updategame", {
      user: props.location.state.user,
      coords: props.location.state.coords,
      gameId: props.location.state.gameId,
      code: props.location.state.code,
    });
  }, []);

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
    if (trueCoords && colors) {
      clearCanvas(canvasRef);
      drawAxes(canvasRef);
      drawPoints(canvasRef, trueCoords, colors);
    }
  });

  return (
    <div className="End-container">
      {players ? <PlayersBar players={players} gameId={props.location.state.gameId} /> : <div />}
      <div className="End-chartContainer">
        <p>{chart.up}</p>
        <div className="End-chartMiddle">
          <p>{chart.left}</p>
          <div>
            <canvas ref={canvasRef} id="End-canvas" width="500px" height="500px"></canvas>
          </div>
          <p>{chart.right}</p>
        </div>
        <p>{chart.down}</p>
      </div>

      <div className="End-topBar">
        <b>
          <u>True Chart</u>
        </b>
      </div>

      <div className="End-facts"></div>
      <Link to="/">
        <button>Done</button>
      </Link>
    </div>
  );
};

export default End;
