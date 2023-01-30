// get the charts model here probably

/* constants */
const colors = ["red", "blue", "green", "yellow", "purple", "orange", "silver"]; // colors to use for players
const charts = [{ up: "up", down: "down", left: "left", right: "right" }];
//

const getRandomChart = () => {
  const item = charts[Math.floor(Math.random() * charts.length)];
  return item;
};

const initializeResults = (players) => {
  let out = {};

  for (let player of players) {
    let temp = {};
    for (p of players) {
      temp[p] = [-1000, -1000];
    }
    out[player] = temp;
  }

  return out;
};

const assignColors = (players) => {
  let out = {};

  for (let i = 0; i < players.length; i++) {
    out[players[i]] = colors[i];
  }

  return out;
};

const getTruePoints = (allCoords) => {
  /*
  inputs:
    allCoords -- im pretty sure this is a map of maps
  */
  let out = {};

  let allCoordsObject = Object.fromEntries(allCoords);
  for ([key, val] of Object.entries(allCoordsObject)) {
    let singleCoord = Object.fromEntries(val);
    out[key] = singleCoord[key];
  }

  return out;
};

const getDistance = (coord1, coord2) => {
  /*
  inputs:
    coord1 -- coordinates in the form of an array: [x,y]
    coord2 -- ditto of above
  */

  return ((coord2[0] - coord1[0]) ** 2 + (coord2[1] - coord1[1]) ** 2) ** (1 / 2);
};

module.exports = {
  getRandomChart,
  initializeResults,
  assignColors,
  getTruePoints,
};
