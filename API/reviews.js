const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('get /');
  res.send('get /');
});

router.get('/meta', (req, res) => {
  console.log('get /meta');
  res.send('get /meta');
});

router.post('/', (req, res) => {
  console.log('post /');
  res.send('post /');
});

router.put('/:review_id/helpful', (req, res) => {
  console.log('put /:review_id/helpful');
  res.send('put /:review_id/helpful');
});

router.put('/:review_id/report', (req, res) => {
  console.log('put /:review_id/report');
  res.send('put /:review_id/report');
});

module.exports = router;
