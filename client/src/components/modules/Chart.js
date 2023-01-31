import React, { useEffect, useRef, useState } from "react";
import { Link } from "@reach/router";

import { drawAxes, drawPoints, clearCanvas } from "../../canvasManager.js";
import { get, post } from "../../utilities.js";

import "./Chart.css";

/*
props:
  currentPlayer  -- gives us the player whose avatar button was more recently pressed
  user  -- gives us the id of the player in control
  gameId  -- gives us the id of the game
  code -- gives us the code of the socket room
*/

const Chart = (props) => {
  const canvasRef = useRef(undefined);
  const [coords, setCoords] = useState(undefined);
  const [colors, setColors] = useState(undefined);
  const [chart, setChart] = useState({ left: "t", right: "t", up: "t", down: "t" });

  useEffect(() => {
    get("/api/getchart", { gameId: props.gameId }).then((chart) => {
      setChart(chart);
    });

    get("/api/coords", {
      user: props.user,
      gameId: props.gameId /* this is probably going to come from the prop as well */,
    }).then((result) => {
      setCoords(result);
    });

    get("/api/colors", {
      gameId: props.gameId /* this is probably going to come from the prop as well */,
    }).then((colorDict) => {
      setColors(colorDict);
    });
  }, []);

  useEffect(() => {
    if (coords && colors) {
      clearCanvas(canvasRef);
      drawAxes(canvasRef);
      drawPoints(canvasRef, coords, colors);
    }
  });

  const handleCanvasClick = (event) => {
    if (props.currentPlayer !== undefined) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      let newCoords = { ...coords };
      newCoords[props.currentPlayer] = [x, y];
      setCoords(newCoords);
    }
  };

  return (
    <div className="Chart-container">
      <p>{chart.up}</p>
      <div className="Chart-middle">
        <p>{chart.left}</p>
        <div>
          <canvas
            ref={canvasRef}
            id="Chart-canvas"
            onClick={handleCanvasClick}
            width="500px"
            height="500px"
          ></canvas>
        </div>
        <p>{chart.right}</p>
      </div>
      <p>{chart.down}</p>
      <Link id="Submit-link" to="/end"
        state={{ user: props.user, coords: coords, gameId: props.gameId, code: props.code }}
      >
        Submit
      </Link>
    </div>
  );
};

export default Chart;
