const express = require('express');
const controllers = require('../DATABASE/Reviews/controllers');

const router = express.Router();

router.get('/', controllers.Review.getReviews);

router.get('/meta', (req, res) => {
  const params = req.body;
  res.send();
});

router.post('/', (req, res) => {
  const params = req.body;
  res.sendStatus(201);
});

router.put('/:review_id/helpful', (req, res) => {
  const reviewID = req.params.review_id;
  res.sendStatus(204);
});

router.put('/:review_id/report', (req, res) => {
  const reviewID = req.params.review_id;
  res.sendStatus(204);
});

module.exports = router;
