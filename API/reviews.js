const express = require('express');
const controllers = require('../DATABASE/Reviews/controllers');

const router = express.Router();

router.get('/', controllers.Review.getReviews);

router.get('/meta', controllers.Review.getReviewsMeta);

router.post('/', controllers.reviewCreate);

router.put('/:review_id/helpful', controllers.markHelpful);

router.put('/:review_id/report', (req, res) => {
  const reviewID = req.params.review_id;
  res.sendStatus(204);
});

module.exports = router;
