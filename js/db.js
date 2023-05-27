const saveGame = (game) => {
  try {
    const data = readData();
    if (data) {
      const g = data.db.find((x) => x.id === game.id);
      if (!g) {
        data.db.push(game);
        saveData(JSON.stringify(data.db));
      }
    } else {
      localStorage.setItem("db", `{"db":[${JSON.stringify(game)}]}`);
    }
  } catch (e) {
    console.error(e);
  }
};

const getGame = (id) => {
  const data = readData();
  if (data) {
    return data.db.find((x) => x.id === id);
  }
  console.error("game id not found");
};

const saveData = (db) => localStorage.setItem("db", db);

const readData = () => JSON.parse(localStorage.getItem("db"));

export { saveGame, readData, getGame };