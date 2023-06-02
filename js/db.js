const saveGame = (game, roomID) => {
  const data = getData();
  if (data[roomID]) {
    const g = data[roomID].games.find((x) => x.id === game.id);
    if (!g) {
      data[roomID].games.push(game);
    } else {
      const games = data[roomID].games.filter((x) => x.id !== game.id);
      games.push(game);
      data[roomID].games = games;
    }
    saveData(data);
  }
};

const saveMoves = (moves, id, roomID) => {
  try {
    const game = getGame(id, roomID);
    saveGame({ ...game, moves }, roomID);
  } catch (e) {
    console.error(e);
  }
};

const getGame = (id, roomID) => {
  const data = getData();
  if (data[roomID]) {
    return data[roomID].games.find((x) => x.id === id);
  }
  console.error("game id not found");
};

const getGames = (roomID) => {
  const data = getData();
  if (data[roomID]) {
    return data[roomID].games;
  }
  console.error("No games found");
};

const saveData = (db) => localStorage.setItem("db", JSON.stringify(db));

const getData = () => JSON.parse(localStorage.getItem("db"));

const createNewRoom = (roomID) => {
  const db = getData();
  const newDB = { ...db, [roomID]: { createdDate: Date.now(), games: [] } };
  saveData(newDB);
};

export { saveGame, getData, getGame, saveMoves, createNewRoom , getGames};
