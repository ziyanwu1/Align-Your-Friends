let canvas;

const fillCircle = (context, x, y, radius, color) => {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
};

const drawAxes = (canvasRef) => {
  let canvas = canvasRef.current;
  const context = canvas.getContext("2d");

  context.fillStyle = "black";
  context.fillRect(0, canvas.height / 2, canvas.width, 3);
  context.fillRect(canvas.width / 2, 0, 3, canvas.height);
};

const drawCircle = (canvas, x, y, color) => {
  const RADIUS = 4;

  const context = canvas.getContext("2d");

  fillCircle(context, x, y, RADIUS, color);
};

const drawPoints = (canvasRef, coords, colors) => {
  /*
  the 'coords' are the points that one player plots for everyone else on their canvas
  */
  let canvas = canvasRef.current;

  for (let [key, val] of Object.entries(coords)) {
    let x = val[0];
    let y = val[1];
    let color = colors[key];
    drawCircle(canvas, x, y, color);
  }
};

const clearCanvas = (canvasRef) => {
  let canvas = canvasRef.current;
  const context = canvas.getContext("2d");

  context.clearRect(0, 0, canvas.width, canvas.height);
};

export { drawAxes, drawPoints, clearCanvas };
