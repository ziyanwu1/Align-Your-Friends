// get the charts model here probably

/* constants */
const colors = ["red", "blue", "green", "yellow", "purple", "orange", "silver"]; // colors to use for players
const charts = [{ up: "up", down: "down", left: "left", right: "right" }, 
{ up: "hot weather", down: "cold weather", left: "city", right: "suburbs" },
{ up: "all knowing", down: "confused", left: "seems all knowing", right: "seems confused" },
{ up: "looks like a cinnamon roll", down: "looks like they would kill you", left: "would kill you", right: "cinnamon roll" },
{ up: "causes problems", down: "solves problems", left: "by accident", right: "on purpose" },
{ up: "likes sweet snacks", down: "likes savory snacks", left: "picky eater", right: "will eat anything" },
{ up: "jock", down: "nerd", left: "prep", right: "goth" }, 
{ up: "enigmatic", down: "an open book", left: "crewmate", right: "imposter" }, 
{ up: "book", down: "movie", left: "fantasy", right: "realism" }];
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
