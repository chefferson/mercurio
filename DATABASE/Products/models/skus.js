const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/sequelizeInit');

const Skus = sequelize.define('Skus', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  style_id: {
    type: DataTypes.INTEGER,
  },
  size: {
    type: DataTypes.TEXT,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
}, {
  createdAt: false,
  updatedAt: false,
});

module.exports.Skus = Skus;
