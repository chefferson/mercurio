const { Sequelize } = require('sequelize');

require('dotenv').config();

const {
  DB_PRODUCTS_TYPE,
  DB_PRODUCTS_NAME,
  DB_PRODUCTS_HOST,
  DB_PRODUCTS_PORT,
  DB_PRODUCTS_USER,
} = process.env;

const sequelize = new Sequelize(`${DB_PRODUCTS_TYPE}://${DB_PRODUCTS_USER}@${DB_PRODUCTS_HOST}:${DB_PRODUCTS_PORT}/${DB_PRODUCTS_NAME}`);

const loadData = async () => {
  try {
    await sequelize.query('COPY "Products" FROM \'/Users/willweindel/Desktop/CSVData/product.csv\' DELIMITER \',\' CSV HEADER');
    await sequelize.query('COPY "Styles" FROM \'/Users/willweindel/Desktop/CSVData/styles.csv\' DELIMITER \',\' CSV HEADER');
    await sequelize.query('COPY "Features" FROM \'/Users/willweindel/Desktop/CSVData/features.csv\' DELIMITER \',\' CSV HEADER');
    await sequelize.query('COPY "Skus" FROM \'/Users/willweindel/Desktop/CSVData/skus.csv\' DELIMITER \',\' CSV HEADER');
    await sequelize.query('COPY "Photos" FROM \'/Users/willweindel/Desktop/CSVData/photos.csv\' DELIMITER \',\' CSV HEADER');
    await sequelize.query('COPY "Relateds" FROM \'/Users/willweindel/Desktop/CSVData/related.csv\' DELIMITER \',\' CSV HEADER');
  } catch (error) {
    console.log(error);
  }
};

const transformData = async () => {
  try {
    await sequelize.query('UPDATE "Features" SET product_id = product_id + 17066 WHERE product_id > 0');
    await sequelize.query('UPDATE "Photos" SET style_id = style_id + 90249 WHERE style_id > 0');
    await sequelize.query('UPDATE "Products" SET product_id = product_id + 17066 WHERE product_id > 0');
    await sequelize.query('UPDATE "Relateds" SET current_product_id = current_product_id + 17066 WHERE current_product_id > 0');
    await sequelize.query('UPDATE "Relateds" SET related_product_id = related_product_id + 17066 WHERE related_product_id > 0');
    await sequelize.query('UPDATE "Skus" SET style_id = style_id + 90249 WHERE style_id > 0');
    await sequelize.query('UPDATE "Styles" SET product_id = product_id + 17066 WHERE product_id > 0');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

module.exports.loadData = loadData;
module.exports.transformData = transformData;