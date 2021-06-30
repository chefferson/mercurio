const { Sequelize } = require('sequelize');

require('dotenv').config();

const {
  DB_REVIEWS_TYPE,
  DB_REVIEWS_NAME,
  DB_REVIEWS_HOST,
  DB_REVIEWS_PORT,
  DB_REVIEWS_USER,
  DB_REVIEWS_PASSWORD,
} = process.env;

// const sequelize = new Sequelize(`${DB_REVIEWS_TYPE}://${DB_REVIEWS_USER}:${DB_REVIEWS_PASSWORD}@${DB_REVIEWS_HOST}:${DB_REVIEWS_PORT}/${DB_REVIEWS_NAME}`, {
//   logging: false,
// });

const sequelize = new Sequelize(DB_REVIEWS_NAME, DB_REVIEWS_USER, DB_REVIEWS_PASSWORD, {
  host: DB_REVIEWS_HOST,
  port: DB_REVIEWS_PORT,
  dialect: DB_REVIEWS_TYPE,
  logging: false,
});

module.exports = {
  sequelize,
};
