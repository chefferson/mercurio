const Review = require('../models/review');
const ReviewPhoto = require('../models/reviewPhoto');
const { sequelize } = require('../db');
const { rectifyNum, setSortOrder } = require('./utils');

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
      where: { product_id: productID },
      order,
      limit: count,
      offset: count * page - count,
      include: {
        model: ReviewPhoto,
        attributes: [
          'id',
          'url',
        ],
        as: 'photos',
      },
    });
    res.send(responseBody);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const countColumnAfterMatching = async (model, matchColumn, matchValue, countColumn) => {
  const where = {};
  where[matchColumn] = matchValue;
  const raw = await model.findAll({
    attributes: [
      countColumn,
      [sequelize.fn('COUNT', countColumn), `${countColumn}Count`],
    ],
    group: [countColumn],
    where,
  });
  return raw;
};

const getRatings = async (productID) => {
  const ratingsRaw = await countColumnAfterMatching(Review, 'product_id', productID, 'rating');
  return ratingsRaw.reduce((acc, item) => {
    acc[item.dataValues.rating] = item.dataValues.ratingCount;
    return acc;
  }, {
    1: '0', 2: '0', 3: '0', 4: '0', 5: '0',
  });
};

const getRecommended = async (productID) => {
  const recommendedRaw = await countColumnAfterMatching(Review, 'product_id', productID, 'recommend');
  return recommendedRaw.reduce((acc, item) => {
    acc[item.dataValues.recommend] = item.dataValues.recommendCount;
    return acc;
  }, {
    true: '0', false: '0',
  });
};

module.exports.getReviewsMeta = async (req, res) => {
  const productID = req.body.product_id;
  const responseBody = {
    product_id: productID,
  };
  const queries = [];
  queries.push(await getRecommended(productID));
  queries.push(await getRatings(productID));
  try {
    await Promise.all(queries);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
  [responseBody.recommended, responseBody.ratings] = queries;
  res.send(responseBody);
};
