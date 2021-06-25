const express = require('express');
const { getQuestions, postQuestion } = require('../DATABASE/Questions/controllers/QuestionsController');
const { getAnswers } = require('../DATABASE/Questions/controllers/AnswersController');

const router = express.Router();
/// ////////////////QUESTIONS////////////////// ///
router.get('/questions', async (req, res) => {
  const productId = req.body.product_id ? req.body.product_id : req.query.product_id;
  const count = req.body.count ? req.body.count : 5;
  const page = req.body.page ? req.body.page : 1;
  try {
    const result = await getQuestions(productId, count, page);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});
router.post('/questions', async (req, res) => {
  try {
    console.log(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});
/// ///////////////////ANSWERS//////////////////// ///
router.get('/questions/:question_id/answers', async (req, res) => {
  console.log('got here');
  const questionId = req.params.question_id ? req.params.question_id : req.query.question_id;
  const count = req.body.count ? req.body.count : 5;
  const page = req.body.page ? req.body.page : 1;
  try {
    const result = await getAnswers(questionId, count, page);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
});

module.exports = router;
