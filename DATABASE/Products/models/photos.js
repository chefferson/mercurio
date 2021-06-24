const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/sequelizeInit');

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
  createdAt: false,
  updatedAt: false,
});

module.exports.Photos = Photos;
