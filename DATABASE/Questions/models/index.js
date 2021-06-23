const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.database, config.username, config.password);

const models = {
  question: sequelize.import('./question.js'),
  answer: sequelize.import('./answer.js'),
  photo: sequelize.import('./photo'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
