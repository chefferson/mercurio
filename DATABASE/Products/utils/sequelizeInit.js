const { Sequelize } = require('sequelize');

require('dotenv').config();

const {
  DB_PRODUCTS_NAME,
  DB_PRODUCTS_HOST,
  DB_PRODUCTS_USER,
  DB_PRODUCTS_PASSWORD,
} = process.env;

const sequelize = new Sequelize(`${DB_PRODUCTS_NAME}`, `${DB_PRODUCTS_USER}`, `${DB_PRODUCTS_PASSWORD}`, {
  host: DB_PRODUCTS_HOST,
  dialect: 'postgres',
  logging: false,
});

module.exports = {
  sequelize,
};
