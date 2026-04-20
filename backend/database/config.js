const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/database.sqlite",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("database conncation successfully");
  })
  .catch((error) => {
    console.log("Error : ", error);
  });

module.exports = sequelize;
