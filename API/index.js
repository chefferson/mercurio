const express = require('express');
const bodyParser = require('body-parser');

const products = require('./products');
const qa = require('./qa');
const reviews = require('./reviews');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/products', products);
app.use('/qa', qa);
app.use('/reviews', reviews);

app.get('/loaderio-ecf03d8890983bbc217f84a581ac2ce2', (req, res) => {
  res.send('loaderio-ecf03d8890983bbc217f84a581ac2ce2');
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on port ${process.env.SERVER_PORT}`);
});
