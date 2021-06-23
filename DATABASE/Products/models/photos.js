const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config();

const {
  DB_PRODUCTS_TYPE,
  DB_PRODUCTS_NAME,
  DB_PRODUCTS_HOST,
  DB_PRODUCTS_PORT,
  DB_PRODUCTS_USER,
} = process.env;

const sequelize = new Sequelize(`${DB_PRODUCTS_TYPE}://${DB_PRODUCTS_USER}@${DB_PRODUCTS_HOST}:${DB_PRODUCTS_PORT}/${DB_PRODUCTS_NAME}`);

const Photos = sequelize.define('Photos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  style_id: {
    type: DataTypes.INTEGER,
  },
  url: {
    type: DataTypes.TEXT,
  },
  thumbnail_url: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: false,
});

module.exports.Photos = Photos;
