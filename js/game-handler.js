import { getGame, saveMoves } from "./db.js";

let moves = [];
let mainID;

const gameTitle = document.querySelector("#gameTitle");
const loserPlayers = document.querySelector("#loserPlayers");
const winnerPlayers = document.querySelector("#winnerPlayers");
const points = document.querySelector("#points");
const formGame = document.querySelector("#formGame");
const tbodyMoves = document.querySelector("#tbodyMoves");
const btnFinish = document.querySelector("#finish");

document.addEventListener("DOMContentLoaded", () => {
  const parameters = new URLSearchParams(window.location.search);
  mainID = parameters.get("id");
  if (mainID) {
    const game = getGame(mainID);
    gameTitle.innerHTML = `🎲 Juego #${mainID.split("-")[0]}`;
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
  const result = {
    points: points.options[points.selectedIndex].text,
    value: points.value,
  };

  moves.push({ loserPlayer, winnerPlayer, result });

  loserPlayers.selectedIndex = 0;
  winnerPlayers.selectedIndex = 0;
  points.selectedIndex = 0;

  renderMoves();
});

btnFinish.addEventListener("click", () => {
  if (moves.length <= 0) {
    return alert('El juego debe tener almenos 1 movida! 👾');
  }
  saveMoves(moves, mainID);
  window.location.href = `results.html?id=${mainID}`;
});

const renderMoves = () => {
  if (moves.length > 0) {
    let htmlMoves = [];
    for (let i = tbodyMoves.childNodes.length; i < moves.length; i++) {
      htmlMoves.push(
        `<tr>
          <th scope="row">${i + 1}</th>
          <td>${moves[i].loserPlayer}</td>
          <td>${moves[i].result.points}</td>
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
};
