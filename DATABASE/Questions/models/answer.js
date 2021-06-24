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
    type: DataTypes.STRING(1000),
  },
  date_written: {
    type: DataTypes.STRING,
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
