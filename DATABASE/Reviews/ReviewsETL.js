const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config();

const {
  DB_TYPE,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_USER,
} = process.env;
const sequelize = new Sequelize(`${DB_TYPE}://${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  rating: DataTypes.INTEGER,
  summary: DataTypes.STRING(512),
  recommend: DataTypes.BOOLEAN,
  response: DataTypes.TEXT,
  body: DataTypes.TEXT,
  reviewer_name: DataTypes.STRING,
  helpfulness: DataTypes.INTEGER,
});

const synchronize = async () => {
  try {
    await Review.sync({ force: true });
    console.log('Synchronization successful');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await synchronize();
    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connect();
