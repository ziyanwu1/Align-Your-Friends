import React, { useState, useEffect, useRef } from "react";

import { drawAxes, drawPoints, clearCanvas } from "../../canvasManager.js";
import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";

import "./End.css";
/*
props:
    location.state.gameId -- gives us the id of the game on the database
    location.state.user
    location.state.coords
    location.state.code
*/

const End = (props) => {
  const canvasRef = useRef(undefined);

  const [trueCoords, setTrueCoords] = useState(undefined);
  const [colors, setColors] = useState(undefined);
  const [chart, setChart] = useState({ left: "t", right: "t", up: "t", down: "t" });

  useEffect(() => {
    socket.on("newtruepoint", (coords) => {
      console.log(coords);
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
  }, []);

  useEffect(() => {
    if (trueCoords) {
      clearCanvas(canvasRef);
      drawAxes(canvasRef);
      drawPoints(canvasRef, trueCoords, colors);
    }
  });

  return (
    <div className="End-container">
      <div className="End-topBar">
        <b>
          <u>True Chart</u>
        </b>
      </div>
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

      <div className="End-facts"></div>
    </div>
  );
};

export default End;
