const { sequelize } = require('../db');

const indexesToBuild = [
  {
    table: 'Reviews',
    name: 'product_id_index',
    column: 'product_id',
  },
  {
    table: 'ReviewPhotos',
    name: 'photo',
    column: 'review_id',
  },
];

const buildIndexes = async (indexes) => {
  const operations = [];
  indexes.forEach((spec) => {
    operations.push(sequelize.query(`CREATE INDEX IF NOT EXISTS ${spec.name} ON "${spec.table}" (${spec.column});`));
  });
  await Promise.all(operations);
};

buildIndexes(indexesToBuild);
