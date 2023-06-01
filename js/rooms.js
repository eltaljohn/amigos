import { getData, createNewRoom } from "./db.js";
import { generateID } from "./helpers.js";
import { formatTimeAgo } from "./time.js";

const divRooms = document.querySelector("#rooms");
const btnNewRoom = document.querySelector("#newRoom");

btnNewRoom.addEventListener('click', () => {
  const roomID = generateID();
  createNewRoom(roomID);
  window.location.href = `create-new-game.html?roomid=${roomID}`;
});

document.addEventListener("DOMContentLoaded", () => {
  const db = getData();
  console.log({db});
  if (!db) return alert("No hay salas creadas 😶‍🌫️, crea una para iniciar tu juego 🎮.");
  renderGames(Object.keys(db), db);
});

const renderGames = (roomIDs, rooms) => {
  console.log({roomIDs}, {rooms});
  let htmlGames = "";
  for (let i = roomIDs.length - 1; i >= 0; i--) {
    htmlGames = `<a href="game-list.html?roomid=${
      roomIDs[i]
    }" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
    🕹️
    <div class="d-flex gap-2 w-100 justify-content-between">
      <div>
        <h6 class="mb-0">Sala #${roomIDs[i].split("-")[0]} 👉</h6>       
      </div>
      <small class="opacity-50 text-nowrap">${formatTimeAgo(
        rooms[roomIDs[i]].createdDate
      )}</small>
    </div>
  </a>`;

    let div = document.createElement("div");
    div.innerHTML = htmlGames;
    divRooms.appendChild(div.firstChild);
  }
};
