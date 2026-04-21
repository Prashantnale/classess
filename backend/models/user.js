const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");

const User = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Full Name can not be emty",
        },
        notNull: {
          msg: "Full name is require",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email can not be emty",
        },
        notNull: {
          msg: "Email is require",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password can not be emty",
        },
        notNull: {
          msg: "Password is require",
        },
      },
    },
  },
  {
    timestamps: true,
  },
);

User.sync();

module.exports = User;
