const { sequelize } = require('../db');

const indexSpecs = [
  {
    model: 'Reviews',
    indexes: [
      {
        name: 'product_id_index',
        column: 'product_id',
      },
    ],
  },
];

const buildIndexes = async (specs) => {
  const operations = [];
  specs.forEach((spec) => {
    spec.indexes.forEach((index) => {
      operations.push(sequelize.query(`CREATE INDEX IF NOT EXISTS ${index.name} ON "${spec.model}" (${index.column});`));
    });
  });
  await Promise.all(operations);
};

buildIndexes(indexSpecs);
