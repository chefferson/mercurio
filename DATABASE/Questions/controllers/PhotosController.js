const { Photo } = require('../models/photo');

const getPhotos = (answerId) => (
  new Promise((resolve, reject) => {
    Photo.findAll({
      where: {
        answer_id: answerId,
      },
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  })
);

module.exports = {
  getPhotos,
};
