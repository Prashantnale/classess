const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Class = sequelize.define('Class', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  }
});

Class.associate = (models) => {
  Class.hasMany(models.Student, {
    foreignKey: 'classId',
    as: 'students'
  });
};

module.exports = Class;
