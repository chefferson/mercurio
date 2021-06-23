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

const Styles = sequelize.define('Styles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  product_Id: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.TEXT,
  },
  sale_price: {
    type: DataTypes.INTEGER,
  },
  original_price: {
    type: DataTypes.INTEGER,
  },
  default_style: {
    type: DataTypes.BOOLEAN,
  },
}, {
  timestamps: false,
});

module.exports.Styles = Styles;
