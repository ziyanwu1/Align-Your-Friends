import React, { useEffect, useState } from "react";

import { get } from "../../utilities.js";

import "./Avatar.css";

/*
props:
    playerId : a player id for a single player
    playerColor: a color for the given player
    onClick : the onClick function for when the button is pressed

*/

// we can probably use a useEffect to translate the player id to a name

const Avatar = (props) => {
  const [name, setName] = useState("anon");

  useEffect(() => {
    get("/api/user", { userId: props.playerId }).then((user) => {
      setName(user.name);
    });

    //cleanup function haha
    return () => {};
  }, []);

  const updateCurrent = () => {
    props.onClick(props.playerId);
  };

  return (
    <div className="Avatar-container">
      <svg width="30" height="30">
        <rect width="30" height="30" fill={props.playerColor}></rect>
      </svg>
      <button className="Avatar-button" onClick={updateCurrent}>
        {name}
      </button>
    </div>
  );
};

export default Avatar;
