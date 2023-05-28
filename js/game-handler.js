import { getGame } from "./db.js";

let moves = [];

const gameTitle = document.querySelector("#gameTitle");
const loserPlayers = document.querySelector("#loserPlayers");
const winnerPlayers = document.querySelector("#winnerPlayers");
const points = document.querySelector("#points");
const formGame = document.querySelector("#formGame");
const tbodyMoves = document.querySelector("#tbodyMoves");

document.addEventListener("DOMContentLoaded", () => {
  const parameters = new URLSearchParams(window.location.search);
  const id = parameters.get("id");
  if (id) {
    const game = getGame(id);
    gameTitle.innerHTML = `🎲 Juego #${id.split('-')[0]}`;
    addPlayersOptions(loserPlayers, game.players, "Selecctione...");
    addPlayersOptions(winnerPlayers, game.players, "Selecctione...");
    addPointsOptions(points, game.rules, "Seleccione...");
    return;
  }
  window.history.back();
});

const addPlayersOptions = (selectElement, values, initialValue) => {
  let optionsHTML = `<option selected disabled value="">${initialValue}</option>`;
  for (const value of values) {
    optionsHTML += `<option value="${value}">${value}</option>`;
  }
  selectElement.innerHTML = optionsHTML;
};

const addPointsOptions = (selectElement, rules, initialValue) => {
  let optionsHTML = `<option selected disabled value="">${initialValue}</option>`;
  for (const rule of rules) {
    optionsHTML += `<option value="${rule.value}">${rule.points}</option>`;
  }
  selectElement.innerHTML = optionsHTML;
};

formGame.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!formGame.checkValidity()) return formGame.classList.add("was-validated");
  
  const loserPlayer = loserPlayers.value;
  const winnerPlayer = winnerPlayers.value;
  const point = points.value;

  moves.push({loserPlayer,winnerPlayer,point,});

  loserPlayers.selectedIndex = 0;
  winnerPlayers.selectedIndex = 0;
  points.selectedIndex = 0;
  
  renderMoves();
});

const renderMoves = () => {
  if (moves.length > 0) {
    let htmlMoves = [];
    for (let i = tbodyMoves.childNodes.length; i < moves.length; i++) {
      htmlMoves.push(
        `<tr>
          <th scope="row">${i+1}</th>
          <td>${moves[i].loserPlayer}</td>
          <td>${moves[i].point}</td>
          <td>${moves[i].winnerPlayer}</td>
        </tr>
        `
      );
    }
    for (let i = 0; i < htmlMoves.length; i++) {
      let trElement = document.createElement("tr");
      trElement.innerHTML = htmlMoves[i];
      tbodyMoves.appendChild(trElement);      
    }
  }
}
