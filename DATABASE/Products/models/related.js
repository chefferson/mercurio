const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/sequelizeInit');

const Relateds = sequelize.define('Relateds', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  current_product_id: {
    type: DataTypes.INTEGER,
  },
  related_product_id: {
    type: DataTypes.INTEGER,
  },
}, {
  createdAt: false,
  updatedAt: false,
});

module.exports.Relateds = Relateds;
