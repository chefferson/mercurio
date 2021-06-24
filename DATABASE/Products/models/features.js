const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/sequelizeInit');

const Features = sequelize.define('Features', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
  },
  feature: {
    type: DataTypes.TEXT,
  },
  value: {
    type: DataTypes.TEXT,
  },
}, {
  createdAt: false,
  updatedAt: false,
});

module.exports.Features = Features;
