const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config();

// Create the sequelize object with appropriate configuration
const {
  DB_REVIEWS_TYPE,
  DB_REVIEWS_NAME,
  DB_REVIEWS_HOST,
  DB_REVIEWS_PORT,
  DB_REVIEWS_USER,
} = process.env;
const sequelize = new Sequelize(`${DB_REVIEWS_TYPE}://${DB_REVIEWS_USER}@${DB_REVIEWS_HOST}:${DB_REVIEWS_PORT}/${DB_REVIEWS_NAME}`);

// The model for the review table
const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
  },
  rating: {
    type: DataTypes.INTEGER,
  },
  summary: {
    type: DataTypes.STRING(512),
  },
  body: {
    type: DataTypes.TEXT,
  },
  recommend: {
    type: DataTypes.BOOLEAN,
  },
  reported: {
    type: DataTypes.BOOLEAN,
  },
  response: {
    type: DataTypes.TEXT,
  },
  reviewer_name: {
    type: DataTypes.STRING(100),
  },
  reviewer_email: {
    type: DataTypes.STRING(100),
  },
  helpfulness: {
    type: DataTypes.INTEGER,
  },
}, {
  createdAt: 'date',
  updatedAt: false,
});

// Synchronizes the Review table. Creates a table with the Review schema if it doesn't exist
// already; if it does exist, I believe it will drop the table and create a new one, so you would
// have to reimport data.
const synchronize = async () => {
  try {
    await Review.sync({ force: true });
    console.log('Synchronization successful');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

// Creates a test record for the review table
const buildRecord = async () => {
  const review = Review.build({
    id: 39849,
    product_id: 17071,
    rating: 4,
    summary: 'Not a bad product at all',
    body: 'I really enjoyed using this product. It worked just as expected. It was a little too big, but that\'s my only complaint',
    recommend: true,
    reported: false,
    response: 'Thanks for your review',
    reviewer_name: 'reviewer_johnson',
    reviewer_email: 'johnson_reviews@aol.com',
    hepfulness: 12,
  });
  await review.save();
};

// Connects to the database, synchronizes the Reviews table, and creates a test record for review
// table
const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await synchronize();
    await buildRecord();
    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connect();
