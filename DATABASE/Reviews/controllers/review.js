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
  const page = rectifyNum(req.body.page, 1, 0, Number.POSITIVE_INFINITY);
  const count = rectifyNum(req.body.count, 5, 0, 500);
  const order = setSortOrder(req.body.order);
  const productID = req.body.product_id;
  const responseBody = {
    product: productID,
    page,
    count,
  };
  try {
    responseBody.results = await Review.findAll({
      where: { product_id: productID },
      order,
      limit: count,
      offset: count * page - count,
      attributes: [
        ['id', 'review_id'],
        'rating',
        'summary',
        'body',
        'recommend',
        'response',
        'date',
        'reviewer_name',
        'helpfulness',
      ],
    });
    res.send(responseBody);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
