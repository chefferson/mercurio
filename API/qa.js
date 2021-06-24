const express = require('express');

const router = express.Router();

router.get('/questions', (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send('<h1>Questions</h1>');
});

module.exports = router;
