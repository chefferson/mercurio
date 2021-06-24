const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const params = req.body;
  res.send();
});

router.get('/meta', (req, res) => {
  const params = req.body;
  res.send();
});

router.post('/', (req, res) => {
  const params = req.body;
  res.send();
});

router.put('/:review_id/helpful', (req, res) => {
  const reviewID = req.params.review_id;
  res.send();
});

router.put('/:review_id/report', (req, res) => {
  const reviewID = req.params.review_id;
  res.send();
});

module.exports = router;
