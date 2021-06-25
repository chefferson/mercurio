const Sequelize = require('sequelize');
const { Answer } = require('../models/answer');
const { sequelize } = require('../models/index');

const getAnswers = (questionId, count, page) => (
  new Promise((resolve, reject) => {
    Answer.findAll({
      where: {
        question_id: questionId,
      },
      limit: count,
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  })
);

module.exports = {
  getAnswers,
};
