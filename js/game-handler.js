import { getGame } from "./db.js";

const loserPlayers = document.querySelector('#loserPlayers');
const winnerPlayers = document.querySelector('#winnerPlayers');
const points = document.querySelector('#points');

document.addEventListener("DOMContentLoaded", () => {
  const parameters = new URLSearchParams(window.location.search);
  const id = parameters.get("id");
  console.log(id);
  console.log("game:",getGame(id));
});
