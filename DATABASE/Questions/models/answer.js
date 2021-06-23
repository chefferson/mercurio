const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Answer = sequelize.define('Answer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  question_id: {
    type: DataTypes.INTEGER,
  },
  body: {
    type: DataTypes.STRING,
  },
  date_written: {
    type: DataTypes.DATE,
  },
  answerer_name: {
    type: DataTypes.STRING,
  },
  answerer_email: {
    type: DataTypes.STRING,
  },
  helpfulness: {
    type: DataTypes.INTEGER,
  },
  reported: DataTypes.BOOLEAN,
});

Answer.associate = (models) => {
  Answer.hasMany(models.Photo, {
    foreignKey: 'answer_id',
  });
  Answer.hasOne(models.Question, {
    foreignKey: 'questions_id',
  });
};

Answer.synchronize = async () => {
  try {
    await Answer.sync({ force: true });
    console.log('Synchronization successful');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

module.exports.Answer = Answer;
