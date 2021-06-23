const { Sequelize } = require('sequelize');
const { Products } = require('./product');
const { Styles } = require('./styles');
const { Features } = require('./features');
const { Skus } = require('./skus');
const { Photos } = require('./photos');
const { Related } = require('./related');

require('dotenv').config();

const {
  DB_PRODUCTS_TYPE,
  DB_PRODUCTS_NAME,
  DB_PRODUCTS_HOST,
  DB_PRODUCTS_PORT,
  DB_PRODUCTS_USER,
} = process.env;

const sequelize = new Sequelize(`${DB_PRODUCTS_TYPE}://${DB_PRODUCTS_USER}@${DB_PRODUCTS_HOST}:${DB_PRODUCTS_PORT}/${DB_PRODUCTS_NAME}`);

const synchronize = async () => {
  try {
    await Products.sync({ force: true });
    await Styles.sync({ force: true });
    await Features.sync({ force: true });
    await Skus.sync({ force: true });
    await Photos.sync({ force: true });
    await Related.sync({ force: true });
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
