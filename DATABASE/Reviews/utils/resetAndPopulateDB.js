const path = require('path');
const { sequelize } = require('../db');
const models = require('../models');
const etlConfig = require('../../etlConfig');

/**
 * resetAndPopulateDB first resets the DB, dropping all tables and creating new schemas using the
 * given sequelize models. After the DB is reset, it copies data from a csv on file into the DB
 * using the native COPY postgres function.
 */

const INPUT_DIR = etlConfig.REVIEWS_INPUT_DIR;
const INPUT_FILE_REVIEWS = etlConfig.REVIEWS_INPUT_FILE_REVIEWS;
const INPUT_FILE_REVIEW_PHOTOS = etlConfig.REVIEWS_INPUT_FILE_REVIEW_PHOTOS;
const INPUT_FILE_CHARACTERISTICS = etlConfig.REVIEWS_INPUT_FILE_CHARACTERISTICS;
const INPUT_FILE_CHARACTERISTICS_REVIEWS = etlConfig.REVIEWS_INPUT_FILE_CHARACTERISTICS_REVIEWS;

const sequelizeModels = [
  models.Review,
  models.ReviewPhoto,
  models.Characteristic,
  models.CharacteristicReview,
];

const resetDB = async (dbModels) => {
  console.log('Resetting DB...');
  const operations = [];
  dbModels.forEach((model) => {
    operations.push(model.sync({ force: true }));
  });
  await Promise.all(operations);
  console.log('Finished resetting DB');
};

const copyReviews = async () => {
  const INPUT_PATH = path.join(INPUT_DIR, INPUT_FILE_REVIEWS);
  await sequelize.query(`COPY "Reviews"(id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness) FROM '${INPUT_PATH}' DELIMITER ',' CSV HEADER;`);
};

const copyReviewPhotos = async () => {
  const INPUT_PATH = path.join(INPUT_DIR, INPUT_FILE_REVIEW_PHOTOS);
  await sequelize.query(`COPY "ReviewPhotos"(id,review_id,url) FROM '${INPUT_PATH}' DELIMITER ',' CSV HEADER;`);
};

const copyCharacteristics = async () => {
  const INPUT_PATH = path.join(INPUT_DIR, INPUT_FILE_CHARACTERISTICS);
  await sequelize.query(`COPY "Characteristics"(id,product_id,name) FROM '${INPUT_PATH}' DELIMITER ',' CSV HEADER;`);
};

const copyCharacteristicReviews = async () => {
  const INPUT_PATH = path.join(INPUT_DIR, INPUT_FILE_CHARACTERISTICS_REVIEWS);
  await sequelize.query(`COPY "CharacteristicReviews"(id,characteristic_id,review_id,value) FROM '${INPUT_PATH}' DELIMITER ',' CSV HEADER;`);
};

const copyData = async () => {
  console.log('Copying data into DB (this may take a while)...');
  const processes = [];
  processes.push(copyReviews());
  processes.push(copyReviewPhotos());
  processes.push(copyCharacteristics());
  processes.push(copyCharacteristicReviews());
  await Promise.all(processes);
  console.log('Finished copying data into DB');
};

const resetAndPopulateDB = async () => {
  const startTime = Date.now();
  try {
    await resetDB(sequelizeModels);
    await copyData();
  } catch (err) {
    console.error(err);
  }
  console.log(`Time elapsed: ${(Date.now() - startTime) / 1000} seconds`);
};

resetAndPopulateDB();
