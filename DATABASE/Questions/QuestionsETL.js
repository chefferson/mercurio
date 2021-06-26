const { QueryTypes } = require('sequelize');
const { sequelize } = require('./models/index');
const { questionsPath, answersPath, answersPhotosPath } = require('./config');
const { Question } = require('./models/question');
const { Answer } = require('./models/answer');
const { Photo } = require('./models/photo');

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
    await sequelize.query(
      'ALTER TABLE "Questions" ALTER COLUMN date_written SET DEFAULT CURRENT_TIMESTAMP(0);',
    );
    await sequelize.query(
      'ALTER TABLE "Answers" ALTER COLUMN date_written SET DEFAULT CURRENT_TIMESTAMP(0);',
    );
    await sequelize.query('CREATE INDEX product_idx ON "Questions" USING HASH (product_id)');
    await sequelize.query('CREATE INDEX question_idx ON "Answers" USING HASH (question_id)');
    await sequelize.query('CREATE INDEX answer_idx ON "Photos" USING HASH (answer_id)');
    await sequelize.query('SELECT setval(\'"Questions_id_seq"\', (SELECT MAX(id) FROM "Questions"));');
    await sequelize.query('SELECT setval(\'"Answers_id_seq"\', (SELECT MAX(id) FROM "Answers"));');
    await sequelize.query('SELECT setval(\'"Photos_id_seq"\', (SELECT MAX(id) FROM "Photos"));');
  } catch (err) {
    console.error('ETL FAILED', err);
  }
};

const reset = async () => {
  try {
    await sequelize.authenticate();
    await Question.synchronize();
    await Answer.synchronize();
    await Photo.synchronize();
    await ETL();
    console.log('Connection has been established successfully.');
    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
reset();
