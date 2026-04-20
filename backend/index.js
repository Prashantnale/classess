require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json("hellow World");
});

app.listen(process.env.PORT, () => {
  console.log(`server is running http://localhost:${process.env.PORT}`);
});
