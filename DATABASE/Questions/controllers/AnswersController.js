const Sequelize = require('sequelize');
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

const postAnswer = ({
  body, name, email, questionId, photos,
}) => (
  new Promise((resolve, reject) => {
    Answer.create({
      question_id: questionId,
      body,
      answerer_name: name,
      answerer_email: email,
      reported: false,
      helpfulness: 0,
    }).then(({ id }) => {
      const photosArr = [];
      photos.forEach((photo) => {
        photosArr.push({ answer_id: id, url: photo });
      });
      Photo.bulkCreate(photosArr)
        .then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
    }).catch((err) => {
      reject(err);
    });
  })
);

const updateAnswerHelpfulness = (answerId) => (
  new Promise((resolve, reject) => {
    Answer.update({
      helpfulness: Sequelize.literal('helpfulness + 1'),
    }, {
      where: {
        id: answerId,
      },
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  })
);

const reportAnswer = (answerId) => (
  new Promise((resolve, reject) => {
    Answer.update({
      reported: true,
    }, {
      where: {
        id: answerId,
      },
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  })
);

module.exports = {
  getAnswers,
  updateAnswerHelpfulness,
  reportAnswer,
  postAnswer,
};
