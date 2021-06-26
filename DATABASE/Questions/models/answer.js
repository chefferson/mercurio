const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const { Photo } = require('./photo');

const Answer = sequelize.define('Answer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  question_id: {
    type: DataTypes.INTEGER,
  },
  body: {
    type: DataTypes.STRING(1000),
  },
  date_written: {
    type: DataTypes.BIGINT,
  },
  answerer_name: {
    type: DataTypes.STRING,
  },
  answerer_email: {
    type: DataTypes.STRING,
  },
  reported: {
    type: DataTypes.BOOLEAN,
  },
  helpfulness: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: false,
});

Answer.hasMany(Photo, {
  foreignKey: 'answer_id',
  as: 'photos',
});

Answer.synchronize = async () => {
  try {
    await Answer.sync({ force: true });
    console.log('Synchronization successful');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

module.exports.Answer = Answer;
