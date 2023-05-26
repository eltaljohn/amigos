import { generateID } from "./helpers.js";

let players = [];
let rules = [];

// HMTML referencies
const playersForm = document.querySelector("#playersForm");
const rulesForm = document.querySelector("#rulesForm");
const tbodyplayers = document.querySelector("#tbodyplayers");
const tbodyrules = document.querySelector("#tbodyrules");
const btnPlay = document.querySelector("#playButton");

playersForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!playersForm.checkValidity()) playersForm.classList.add("was-validated");

  const player = playersForm.elements["player"];
  players.push(player.value);
  player.value = "";

  renderPlayersHtml();
});

rulesForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!rulesForm.checkValidity()) rulesForm.classList.add("was-validated");

  const points = rulesForm.elements["points"];
  const money = rulesForm.elements["money"];
  rules.push({ points: points.value, value: money.value });
  points.value = "";
  money.value = "";
  renderRulesHtml();
});

btnPlay.addEventListener("click", () => {
  if (players.length > 0 && rules.length > 0) {
    return (window.location.href = "game.html");
  }
  alert("Agrega jugadores y reglas para jugar 👾");
});

const renderPlayersHtml = () => {
  if (players.length > 0) {
    let htmlPlayers = [];
    for (let i = tbodyplayers.childNodes.length; i < players.length; i++) {
      htmlPlayers.push(
        `<tr><th scope="row">${i + 1}</th><td>${players[i]}</td></tr>`
      );
    }

    for (let i = 0; i < htmlPlayers.length; i++) {
      let trElement = document.createElement("tr");
      trElement.innerHTML = htmlPlayers[i];
      tbodyplayers.appendChild(trElement);
    }
  }
};

const renderRulesHtml = () => {
  if (rules.length > 0) {
    let htmlRules = [];
    for (let i = tbodyrules.childNodes.length - 1; i < rules.length; i++) {
      htmlRules.push(
        `<tr><th scope="row">${i + 1}</th><td>${rules[i].points}</td><td>${
          rules[i].value
        }</td></tr>`
      );
    }

    for (let i = 0; i < htmlRules.length; i++) {
      let trElement = document.createElement("tr");
      trElement.innerHTML = htmlRules[i];
      tbodyrules.appendChild(trElement);
    }
  }
};
