const Sequelize = require('sequelize');
const { sequelize } = require('../models/index');
const { Question } = require('../models/question');

const getQuestions = (productId, count, page) => (
  new Promise((resolve, reject) => {
    Question.findAll({
      where: {
        product_id: productId,
      },
      limit: count,
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  })
);

const postQuestion = ({body, name, email, product_id}) => (
  new Promise((resolve, reject) => {
    Question.create({
      product_id,
      body,
      name,
      email,
    }, {
      fields: ['product_id', 'body', 'asker_name', 'asker_email'],
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  })
);

module.exports = {
  getQuestions,
};
