const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
  },
  body: {
    type: DataTypes.STRING,
  },
  date_written: {
    type: DataTypes.DATE,
  },
  asker_name: {
    type: DataTypes.STRING,
  },
  asker_email: {
    type: DataTypes.STRING,
  },
  helpfulness: {
    type: DataTypes.INTEGER,
  },
  reported: DataTypes.BOOLEAN,
});

Question.associate = (models) => {
  Question.hasMany(models.Answer, {
    foreignKey: 'questions_id',
  });
};

Question.synchronize = async () => {
  try {
    await Question.sync({ force: true });
    console.log('Synchronization successful');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

module.exports.Question = Question;
