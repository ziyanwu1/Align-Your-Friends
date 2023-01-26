const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  players: [String],
  chart: {
    left: String,
    right: String,
    up: String,
    down: String,
  },
  results: {
    type: Map,
    of: {
      type: Map,
      of: [Number],
    },
  },

  colors: {
    type: Map,
    of: String,
  },
});

module.exports = mongoose.model("gameModel", GameSchema);
