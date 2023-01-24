const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  gameid: Number,
  players: [String],
  charts: [
    {
      left: String,
      right: String,
      up: String,
      down: String,
    },
  ],
  results: [
    {
      type: Map,
      of: {
        type: Map,
        of: String,
      },
    },
  ],
  colors: {
    type: Map,
    of: String,
  },
});

module.exports = mongoose.model("gameModel", GameSchema);
