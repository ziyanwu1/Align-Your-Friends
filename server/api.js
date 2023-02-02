/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const ObjectId = require("mongodb").ObjectID;
// import models so we can interact with the database
const User = require("./models/user");
const GameModel = require("./models/gameModel");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

// get gameLogic
const gameLogic = require("./game-logic");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/user", (req, res) => {
  /* 
  inputs:
    req.query.userId -- user's id

  output:
    a User object (follows the User schema format)
  */

  User.findById(req.query.userId).then((user) => {
    res.send(user);
  });
});

// 'initgame': the button to go from lobby to game
router.post("/initgame", (req, res) => {
  /* 
  inputs: 
    req.body.players  -- gives us the list of players when we start the game
    req.body.code  -- gives us the room code of the socket room
  */
  const newGame = new GameModel({
    players: req.body.players,
    chart: gameLogic.getRandomChart(),
    results: gameLogic.initializeResults(req.body.players),
    colors: gameLogic.assignColors(req.body.players),
  });

  newGame.save().then((doc) => {
    const id = doc._id;
    socketManager.getIo().to(req.body.code).emit("startgame", id);
  });

  res.send({});
});

router.get("/coords", (req, res) => {
  /*
  inputs:
    req.query.user  -- gives us the user who is currently pressing things
    req.query.gameId  -- gives us the game we need to look at
  */

  let query = { _id: req.query.gameId };
  let user = req.query.user;
  GameModel.find(query).then((doc) => {
    // we should hopefully only get one document from database
    let result = doc[0]["results"].get(user);
    let out = Object.fromEntries(result);
    res.send(out);
  });
});

router.get("/colors", (req, res) => {
  /*
    inputs:
      req.query.gameId  -- gives us the game we need to look at
  */

  let query = { _id: req.query.gameId };
  GameModel.find(query).then((doc) => {
    // we should hopefully only get one document from database
    let result = doc[0]["colors"];
    let out = Object.fromEntries(result);
    res.send(out);
  });
});

router.get("/allcoords", (req, res) => {
  /*
    inputs:
      req.query.gameId  -- gives us the game we need to look at
  */
  let query = { _id: req.query.gameId };
  GameModel.find(query).then((doc) => {
    // we should hopefully only get one document from database
    let result = doc[0]["results"];
    let out = Object.fromEntries(result);
    res.send(out);
  });
});

router.post("/joinlobby", (req, res) => {
  /*
    inputs:
      req.body.user -- gives us the user (ID) 
      req.body.code -- gives us the room code to join
  */

  let id = req.body.user;
  let code = req.body.code;

  socketManager.getSocketFromUserID(id).join(code);

  let listOfSocketIds = Object.keys(socketManager.getIo().sockets.adapter.rooms[code].sockets);

  let out = [];

  for (let socketId of listOfSocketIds) {
    let userId = socketManager.getUserFromSocketID(socketId)._id;
    out.push(userId);
  }

  // emits a list of userIds to the clients
  socketManager.getIo().to(code).emit("newplayer", out);

  res.send({});
});

router.post("/updategame", (req, res) => {
  /*
  inputs:
    req.body.gameId -- gives us the gane we need to look at
    req.body.user -- gives us the person we need to change
    req.body.coords -- gives us the updated information to change
    req.body.code -- gives us the socket room code.
  */

  let query = { _id: req.body.gameId };
  GameModel.find(query).then((docList) => {
    docList[0]["results"].set(req.body.user, req.body.coords);
    docList[0].save().then((doc) => {
      socketManager
        .getIo()
        .to(req.body.code)
        .emit("newtruepoint", gameLogic.getTruePoints(doc["results"]));

      // the data in "newallpoints" should be an object of objects
      socketManager.getIo().to(req.body.code).emit("newallpoints", doc["results"]);
    });
  });

  let userQuery = { _id: req.body.user };
  User.find(userQuery).then((docList) => {
    docList[0]["pastgames"].unshift(req.body.gameId);
    docList[0].save();
  });
});

router.get("/truepoints", (req, res) => {
  /*
    inputs:
      req.query.gameId  -- gives us the game we need to look at
  */

  let query = { _id: req.query.gameId };
  GameModel.find(query).then((doc) => {
    // we should hopefully only get one document from database
    let result = doc[0]["results"];
    let out = gameLogic.getTruePoints(result);
    res.send(out);
  });
});

router.get("/getchart", (req, res) => {
  /*
  inputs:
    req.query.gameId -- gives us the game we need to look at
  */

  let query = { _id: req.query.gameId };
  GameModel.find(query).then((doc) => {
    let chart = doc[0]["chart"];
    res.send(chart);
  });
});

router.get("/getplayers", (req, res) => {
  /*
  inputs:
    req.query.gameId -- gives us the game we need to look at
  */

  let query = { _id: req.query.gameId };
  GameModel.find(query).then((doc) => {
    // we should hopefully only get one document from database
    let players = doc[0]["players"];
    res.send(players);
  });
});

router.get("/getallusers", (req, res) => {
  /*
  inputs:
    req.query.idList -- gives us a list of userIds to lookup the names of

  outputs:
    gives us a list of user's names
  */
  let query = req.query.idList.split(",");

  User.find({ _id: { $in: query } }).then((docs) => {
    let out = [];
    for (doc of docs) {
      out.push(doc.name);
    }
    res.send(out);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
