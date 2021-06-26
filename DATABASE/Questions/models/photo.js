const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Photo = sequelize.define('Photo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  answer_id: {
    type: DataTypes.INTEGER,
  },
  url: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
});

Photo.synchronize = async () => {
  try {
    await Photo.sync({ force: true });
    console.log('Synchronization successful');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

module.exports.Photo = Photo;
