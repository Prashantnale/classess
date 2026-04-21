require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.get("/", (req, res) => {
  res.json("hellow World");
});

app.use(cors());
app.use(express.json());

const userRoute = require("./routes/userRoutes");
app.use("/api", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`server is running http://localhost:${process.env.PORT}`);
});
