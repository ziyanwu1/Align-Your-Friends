import React, { useState, useEffect } from "react";
// import { Router } from "@reach/router";
// import jwt_decode from "jwt-decode";

import NotFound from "./NotFound.js";
import PlayerList from "../modules/PlayerList.js";

import "../../utilities.css";

// import { socket } from "../../client-socket.js";

// import { get, post } from "../../utilities";

const startGame = () => {
    console.log('wowowowow');
}

const Lobby = () => {
    return (
    <div>
        {/* <PlayerList /> */}
        <button onClick={startGame}>Start</button>
    </div>
    )
}

export default Lobby;