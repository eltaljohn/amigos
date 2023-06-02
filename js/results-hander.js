import { getGame } from "./db.js";

const tbodyMoves = document.querySelector('#tbodyMoves');

let mainID, roomID;
let moves = [];

document.addEventListener("DOMContentLoaded", () => {
  const parameters = new URLSearchParams(window.location.search);
  mainID = parameters.get("id");
  roomID = parameters.get("roomid");
  if (mainID && roomID) {
    const game = getGame(mainID, roomID);
    gameTitle.innerHTML = `🎲 Juego #${mainID.split("-")[0]}`;
    moves = game.moves;
    renderMoves();
    return;
  }
  window.history.back();
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