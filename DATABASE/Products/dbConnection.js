const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: '',
  password: '',
  database: 'testdata',
});

client.connect();

client.on('connect', (err) => {
  if (err) {
    throw err;
  } else {
    console.log('DB Connection Open');
  }
});

client.on('end', (err) => {
  if (err) {
    throw err;
  } else {
    console.log('DB Connection Closed');
  }
});

/* BELOW IS NEEDED FOR ETL */

// client.query('UPDATE features SET product_id = product_id + 17066 WHERE product_id > 0',
// (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result.rows);
//   }
// });

client.query('select * from features where id < 2000', (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result.rows);
  }
  client.end();
});
