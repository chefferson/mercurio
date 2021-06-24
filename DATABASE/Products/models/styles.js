const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/sequelizeInit');

const Styles = sequelize.define('Styles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.TEXT,
  },
  sale_price: {
    type: DataTypes.TEXT,
  },
  original_price: {
    type: DataTypes.INTEGER,
  },
  default_style: {
    type: DataTypes.BOOLEAN,
  },
}, {
  createdAt: false,
  updatedAt: false,
});

module.exports.Styles = Styles;
