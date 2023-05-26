const saveGame = (game) => {
  try {
    const data = readData();
    data.db.find((x) => x.id === game.id);
    // localStorage.setItem(
    //   "db",
    //   '{"db":[{"id":123, "players":["John","Dani"], "rules": [{"points":2, "values":100}]}]}'
    // );
  } catch (e) {
    console.error(e);
  }
};

const saveData = (db) => {
  localStorage.setItem(
    "db",
    db
  );
};

const readData = () => JSON.parse(localStorage.getItem("db"));

export { saveGame, readData };
