import { getGames } from "./db.js";
import { formatTimeAgo } from "./time.js";

const divGames = document.querySelector("#games");
const btnNewGame = document.querySelector("#newGame");

btnNewGame.addEventListener("click", () => window.location.href = `create-new-game.html${location.search}`);

document.addEventListener("DOMContentLoaded", () => {
  const parameters = new URLSearchParams(window.location.search);
  const roomID = parameters.get("roomid");
  const games = getGames(roomID);
  renderGames(games, roomID);
});

const renderGames = (games, roomID) => {
  let htmlGames = "";
  for (let i = games.length - 1; i >= 0; i--) {
    htmlGames = `<a href="game.html?id=${
      games[i].id
    }&roomid=${roomID}" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
    🕹️
    <div class="d-flex gap-2 w-100 justify-content-between">
      <div>
        <h6 class="mb-0">ID ${games[i].id.split("-")[0]}</h6>
        <p class="mb-0 opacity-75">Jugadores de la batalla: ${
          games[i].players
        }</p>
      </div>
      <small class="opacity-50 text-nowrap">${formatTimeAgo(
        games[i].date
      )}</small>
    </div>
  </a>`;

    let div = document.createElement("div");
    div.innerHTML = htmlGames;
    divGames.appendChild(div.firstChild);
  }
};

