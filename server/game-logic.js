// get the charts model here probably

/* constants */
const colors = ["red", "blue", "green", "yellow", "purple", "orange", "silver"]; // colors to use for players

let players = [];
let colorPairs = {};
let charts = [];
let results = [];

/* helper functions */
const dictionary_get = (object, key, defaultValue) => {
  let value = object[key];
  return typeof value !== "undefined" ? value : defaultValue;
};

//

const startGame = (people) => {
  players = [...people];

  for (let i = 0; i < players.length; i++) {
    colorPairs[players[i]] = colors[i];
  }
};

const updateGame = (chartNum, user, currentPlayer, x, y) => {
  /*
  inputs:
    user: the account of the player who is clicking
    currentPlayer: the avatar currently selected by the user
  */

  if (chartNum >= charts.length) {
    return;
  }

  // theoretically, chartNum should ever only be at most 1 over the length of the results array
  if (chartNum >= results.length) {
    results.push({});
  }

  let newResults = dictionary_get(results[chartNum][user], {});
  newResults[currentPlayer] = [x, y];
  results[chartNum][user] = newResults;
};

const resetGame = () => {
  // "post" it to the database of games probably

  players = [];
  colorPairs = {};
  charts = [];
  results = [];
};

module.exports = {
  startGame,
  resetGame,
};
