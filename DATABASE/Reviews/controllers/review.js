const Review = require('../models/review');
const { sequelize } = require('../db');

const rectifyNum = (num, defaultNum = 5, min = 0, max = 500) => {
  let rectifiedNum = num || defaultNum;
  if (typeof rectifiedNum !== 'number' || rectifiedNum < min) {
    rectifiedNum = defaultNum;
  } else if (rectifiedNum > max) {
    rectifiedNum = max;
  }
  return Math.floor(rectifiedNum);
};

const setSortOrder = (sortMethod = 'newest') => {
  const meth = sortMethod.toLowerCase();
  if (meth === 'helpful') {
    return sequelize.literal('helpfulness DESC');
  }
  if (meth === 'relevant') {
    // TODO: determine expected sort order for 'relevant'
  }
  return sequelize.literal('date DESC');
};

module.exports.getReviews = async (req, res) => {
  const page = rectifyNum(req.body.page, 0, 0, Number.POSITIVE_INFINITY);
  const limit = rectifyNum(req.body.count, 5, 0, 500);
  const order = setSortOrder(req.body.order);
  const productID = req.body.product_id;
  try {
    const reviews = await Review.findAll({
      where: { product_id: productID },
      order,
      limit,
      offset: limit * page,
    });
    res.send(reviews);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
