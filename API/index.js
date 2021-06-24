const express = require('express');
// const products = require('./products');
const qa = require('./qa');
const reviews = require('./reviews');

require('dotenv').config();

const app = express();

app.use(express.json());
// app.use('/products', products);
app.use('/qa', qa);
app.use('/reviews', reviews);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on port ${process.env.SERVER_PORT}`);
});
