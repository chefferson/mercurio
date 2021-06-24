const { Sequelize, DataTypes, Op } = require('sequelize');

require('dotenv').config();

const {
  DB_PRODUCTS_TYPE,
  DB_PRODUCTS_NAME,
  DB_PRODUCTS_HOST,
  DB_PRODUCTS_PORT,
  DB_PRODUCTS_USER,
} = process.env;

const sequelize = new Sequelize(`${DB_PRODUCTS_TYPE}://${DB_PRODUCTS_USER}@${DB_PRODUCTS_HOST}:${DB_PRODUCTS_PORT}/${DB_PRODUCTS_NAME}`);

const Features = sequelize.define('Features', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
  },
  feature: {
    type: DataTypes.TEXT,
  },
  value: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: false,
});

Features.findAll({
  where: {
    product_id: {
      [Op.lt]: 2000,
    },
  },
})
  .then((resVal) => {
    console.log(resVal);
    sequelize.close();
  });
