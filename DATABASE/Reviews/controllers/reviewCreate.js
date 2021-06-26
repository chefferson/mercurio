const { Review, ReviewPhoto } = require('../models');

const postReview = async (req, res) => {
  const params = req.body;
  try {
    await Review.create(params);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = postReview;
