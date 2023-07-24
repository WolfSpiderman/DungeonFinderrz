import React from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

export default function GameCard(props) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    if (Auth.loggedIn()) {
      navigate(`/games/${props.id}`);
    } else {
      navigate("/");
    }
  };

  return (
    <li>
      <a href={`/games/${props.id}`} onClick={handleClick}>
        <p>{props.title}</p>
        <p>{props.location}</p>
        <p>{props.date}</p>
        <p>Slots: {props.players.length}/{props.slots}</p>
      </a>
    </li>
  );
}
