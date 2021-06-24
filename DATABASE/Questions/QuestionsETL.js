const { QueryTypes } = require('sequelize');
const { sequelize } = require('./models/index');
const { questionsPath, answersPath, answersPhotosPath } = require('./config');
/*
 * Load Questions
COPY "Questions"
FROM '/Users/jacobsantala/code/SDC/Data/questions.csv'
DELIMITER ','
CSV HEADER;

 * Load Answers
COPY "Answers"
FROM '/Users/jacobsantala/code/SDC/Data/answers.csv'
DELIMITER ','
CSV HEADER;

 * Load Photos
COPY "Photos"
FROM '/Users/jacobsantala/code/SDC/Data/answers_photos.csv'
DELIMITER ','
CSV HEADER;
 */

module.exports.ETL = async () => {
  try {
    await sequelize.query(
      `COPY "Questions" FROM '${questionsPath}' DELIMITER ',' CSV HEADER;`, {
        type: QueryTypes.COPY,
      },
    );
    await sequelize.query(
      `COPY "Answers" FROM '${answersPath}' DELIMITER ',' CSV HEADER;`, {
        type: QueryTypes.COPY,
      },
    );
    await sequelize.query(
      `COPY "Photos" FROM '${answersPhotosPath}' DELIMITER ',' CSV HEADER;`, {
        type: QueryTypes.COPY,
      },
    );
    await sequelize.query(
      'ALTER TABLE "Questions" ALTER COLUMN date_written TYPE timestamp without time zone USING TO_TIMESTAMP(date_written / 1000);',
    );
    await sequelize.query(
      'ALTER TABLE "Answers" ALTER COLUMN date_written TYPE timestamp without time zone USING TO_TIMESTAMP(date_written / 1000);',
    );
  } catch (err) {
    console.error('ETL FAILED', err);
  }
};
