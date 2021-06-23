const { Sequelize } = require('sequelize');

require('dotenv').config();

const {
  DB_TYPE, DB_NAME, DB_HOST, DB_PORT, DB_USER,
} = process.env;

const sequelize = new Sequelize(`${DB_TYPE}://${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connect();
