import React, { useEffect, useState } from "react";

import { get } from "../../utilities.js";

import "./Avatar.css";

/*
props:
    playerId : a player id for a single player
    playerColor: a color for the given player

*/

// we can probably use a useEffect to translate the player id to a name

const Avatar = (props) => {
  const [name, setName] = useState("anon");

  useEffect(() => {

    get("/api/user", { userid: props.playerId }).then((user) => {
      setName(user.name);
    });

    //cleanup function haha
    return ()=>{
    }
    
  }, []);

  const updateCurrent = () => {
    props.onClick(props.playerId);
  };

  return (
    <div className="Avatar-container">
      <svg width="50" height="50"><rect width="50" height="50" fill={props.playerColor}>test2</rect></svg>
      <button onClick={updateCurrent}>{name}</button>
    </div>
  );
};

export default Avatar;
