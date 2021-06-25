const { QueryTypes } = require('sequelize');
const { sequelize } = require('./models/index');
const { questionsPath, answersPath, answersPhotosPath } = require('./config');
const { Question } = require('./models/question');
const { Answer } = require('./models/answer');
const { Photo } = require('./models/photo');

const models = {
  Question,
  Answer,
  Photo,
};

const ETL = async () => {
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

const associate = async () => {
  try {
    Object.keys(models).forEach((modelName) => {
      if ('associate' in models[modelName]) {
        models[modelName].associate(models);
      }
    });
    console.log('tables associated');
  } catch (err) {
    console.error('Error associating the tables', err);
  }
};

const reset = async () => {
  try {
    await sequelize.authenticate();
    await Question.synchronize();
    await Answer.synchronize();
    await Photo.synchronize();
    await associate();
    await ETL();
    console.log('Connection has been established successfully.');
    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
reset();
