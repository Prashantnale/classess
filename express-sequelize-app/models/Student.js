const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER
  },
  rollNumber: {
    type: DataTypes.STRING,
    unique: true
  },
  classId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Student.associate = (models) => {
  Student.belongsTo(models.Class, {
    foreignKey: 'classId',
    as: 'class'
  });
};

module.exports = Student;
