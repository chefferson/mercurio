const { Sequelize } = require('sequelize');

require('dotenv').config();

const {
  DB_REVIEWS_TYPE,
  DB_REVIEWS_NAME,
  DB_REVIEWS_HOST,
  DB_REVIEWS_PORT,
  DB_REVIEWS_USER,
} = process.env;

const sequelize = new Sequelize(`${DB_REVIEWS_TYPE}://${DB_REVIEWS_USER}@${DB_REVIEWS_HOST}:${DB_REVIEWS_PORT}/${DB_REVIEWS_NAME}`);

module.exports = {
  sequelize,
};
