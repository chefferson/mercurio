const { Answer } = require('../models/answer');
const { Photo } = require('../models/photo');

const getAnswers = (questionId, count) => (
  new Promise((resolve, reject) => {
    Answer.findAll({
      include: [
        {
          model: Photo,
          as: 'photos',
        },
      ],
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

const updateAnswerHelpfulness = (answerId) => (
  new Promise((resolve, reject) => {
    console.log('Update');
  })
);

module.exports = {
  getAnswers,
  updateAnswerHelpfulness,
};
