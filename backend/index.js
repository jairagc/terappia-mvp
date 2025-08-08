require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend de TerappIA funcionando");
});

app.listen(3001, () => {
  console.log("Servidor backend en puerto 3001");
});
