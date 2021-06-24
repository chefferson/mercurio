const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(`postgres://${config.username}@${config.host}:${config.port}/${config.database}`);
module.exports.sequelize = sequelize;
const { ETL } = require('../QuestionsETL');
const { Question } = require('./question');
const { Answer } = require('./answer');
const { Photo } = require('./photo');

const models = {
  Question,
  Answer,
  Photo,
};

const associate = async () => {
  try {
    Object.keys(models).forEach((modelName) => {
      if ('associate' in models[modelName]) {
        models[modelName].associate(models);
      }
    });
    console.log('tables associated');
  } catch (err) {
    console.error('Error associating the tables', err);
  }
};

const connect = async () => {
  try {
    await sequelize.authenticate();
    await Question.synchronize();
    await Answer.synchronize();
    await Photo.synchronize();
    await associate();
    await ETL();
    console.log('Connection has been established successfully.');
    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
connect();

module.exports.models = models;
