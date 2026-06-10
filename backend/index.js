require("dotenv").config();
require("./database/config");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
app.get("/", (req, res) => {
  res.json("hellow World");
});

app.use(cors());
app.use(express.json());

// Serve uploaded images as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");

app.use("/api", userRoute);
app.use("/api", productRoute);

app.listen(process.env.PORT, () => {
  console.log(`server is running http://localhost:${process.env.PORT}`);
});
