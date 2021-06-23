const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: '',
  password: '',
  database: 'testdata',
});

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('db is connected');
  }
});

client.query('select * from features where product_id=$1', [2], (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result.rows);
  }
});
