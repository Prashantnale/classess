const fs = require('fs');
const path = require('path');
const sequelize = require('../database');

const basename = path.basename(__filename);
const models = {};

// Read all files in the current directory dynamically
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    models[model.name] = model;
  });

// Execute associate methods to setup relationships
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models
};
