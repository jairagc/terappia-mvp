require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

//Rutas
const sentimentRoute = require("./routes/sentiment");
const ocrRoute = require('./routes/ocr');

app.use(cors());
app.use(express.json());

app.use("/sentiment", sentimentRoute);
app.use('/ocr', ocrRoute);

app.get("/", (req, res) => {
  res.send("Backend de TerappIA funcionando");
});

//Servidor
app.listen(3001, () => {
  console.log("Servidor backend en puerto 3001");
});
