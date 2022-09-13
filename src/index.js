const express = require("express");
const { dataSource } = require("./utils");

const mainRouter = require("./controllers");

const app = express();

app.use(express.json());

app.use("/api", mainRouter);

app.listen(8000, async () => {
  await dataSource.initialize();
  console.log("Server launch on http://localhost:8000");
});


// créer un skill
// supprimer un skill
// Lister tous les skills