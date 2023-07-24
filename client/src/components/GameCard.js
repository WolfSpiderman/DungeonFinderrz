import React from "react";

export default function GameCard(props) {
  return (
    <li>
      <a href={`/games/${props.id}`}>
        <p>{props.title}</p>
        <p>{props.location}</p>
        <p>{props.date}</p>
        <p>Participants: {props.players.length}/{props.maxPlayers}</p>
      </a>
    </li>
  );
}