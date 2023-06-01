const saveGame = (game, roomID) => {
  const data = getData();
  if (data[roomID]) {
    const g = data[roomID].games.find((x) => x.id === game.id);
    if (!g) {
      data[roomID].games.push(game);
      saveData(data);
    } 
    // else {
    //   const games = data[roomID].games.filter((x) => x.id !== game.id);
    //   games.push(game);
    //   saveData(`{"db":${JSON.stringify(games)}}`);
    // }
  }
};

const saveMoves = (moves, id) => {
  try {
    const game = getGame(id);
    saveGame({ ...game, moves });
  } catch (e) {
    console.error(e);
  }
};

const getGame = (id) => {
  const data = getData();
  if (data) {
    return data.db.find((x) => x.id === id);
  }
  console.error("game id not found");
};

const saveData = (db) => localStorage.setItem("db", JSON.stringify(db));

const getData = () => JSON.parse(localStorage.getItem("db"));

const createNewRoom = (roomID) => {
  const db = getData();
  const newDB = { ...db, [roomID]: { createdDate: Date.now(), games: [] } };
  saveData(newDB);
};

export { saveGame, getData, getGame, saveMoves, createNewRoom };
