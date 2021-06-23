const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Photo = sequelize.define('Photo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  answer_id: {
    type: DataTypes.INTEGER,
  },
  url: {
    type: DataTypes.STRING,
  },
});

Photo.associate = (models) => {
  Photo.hasOne(models.Answer, {
    foreignKey: 'answer_id',
  });
};

Photo.synchronize = async () => {
  try {
    await Photo.sync({ force: true });
    console.log('Synchronization successful');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

module.exports.Photo = Photo;
