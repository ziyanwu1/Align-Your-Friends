import React, { useEffect, useRef } from "react";

import { drawAxes, drawCircle } from "../../canvasManager.js";

import "./Chart.css";

// canvas here
//    -- for writing the axises, we might want to use flex boxes and text
//    -- also figure out how to draw the lines
// submit button also here

const Chart = (props) => {
  const canvasRef = useRef(undefined);

  useEffect(() => {
    drawAxes(canvasRef);
  });

  const handleCanvasClick = (event) => {
    if (props.currentPlayer !== undefined) {
      const x = event.clientX;
      const y = event.clientY;
      drawCircle(canvasRef, x, y, "red");
    }
  };

  return (
    <div className="Chart-container">
      <p>top</p>
      <div className="Chart-middle">
        <p>left</p>
        <div>
          <canvas
            ref={canvasRef}
            id="Chart-canvas"
            onClick={handleCanvasClick}
            width="500px"
            height="500px"
          ></canvas>
        </div>
        <p>right</p>
      </div>
      <p>bottom</p>
    </div>
  );
};

export default Chart;
