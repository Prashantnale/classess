const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "demo",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("database conncation successfully");
  })
  .catch((error) => {
    console.log("Error : ", error);
  });

module.exports = sequelize;
