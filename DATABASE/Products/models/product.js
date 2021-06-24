const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/sequelizeInit');

const Products = sequelize.define('Products', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.TEXT,
  },
  slogan: {
    type: DataTypes.TEXT,
  },
  description: {
    type: DataTypes.TEXT,
  },
  category: {
    type: DataTypes.TEXT,
  },
  default_price: {
    type: DataTypes.INTEGER,
  },
}, {
  createdAt: false,
  updatedAt: false,
});

module.exports.Products = Products;
