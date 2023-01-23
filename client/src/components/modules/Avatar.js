import React, { useEffect, useState } from "react";

import { get } from "../../utilities.js";

import "./Avatar.css";

/*
props:
    playerId : a player id for a single player

*/

// we can probably use a useEffect to translate the player id to a name

const Avatar = (props) => {
  const [name, setName] = useState("anon");

  useEffect(() => {
    get("/api/user", { userid: props.playerId }).then((user) => {
      setName(user.name);
    });
  }, []);

  const updateCurrent = () => {
    props.onClick(props.playerId);
  };

  return (
    <div>
      <button onClick={updateCurrent}>{name}</button>
    </div>
  );
};

export default Avatar;
