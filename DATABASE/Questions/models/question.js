const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const { Answer } = require('./answer');

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
  },
  body: {
    type: DataTypes.STRING(1000),
  },
  date_written: {
    type: DataTypes.BIGINT,
  },
  asker_name: {
    type: DataTypes.STRING,
  },
  asker_email: {
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

Question.hasMany(Answer, {
  foreignKey: 'question_id',
  as: 'answers',
});

Question.synchronize = async () => {
  try {
    await Question.sync({ force: true });
    console.log('Synchronization successful');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

module.exports.Question = Question;
