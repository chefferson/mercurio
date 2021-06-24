const fs = require('fs');
const csv = require('csv');

/**
 * This module exports a function, transformCSV, that will read a csv from file, apply any number
 * of transform functions to each row, and write the processed csv to file.
 */

const transformCSV = (inputFilePath, outputFilePath, ...transformFunctions) => {
  const startTime = Date.now();
  const parser = csv.parse({ delimiter: ',', columns: true });
  const stringifier = csv.stringify({ delimiter: ',', header: true });
  const readStream = fs.createReadStream(inputFilePath);
  const writeStream = fs.createWriteStream(outputFilePath);
  let counter = 0;

  parser
    .on('error', (err) => {
      console.error(err);
    })
    .on('readable', async () => {
      let record = parser.read();
      while (record) {
        let transformedRecord = record;
        transformFunctions.forEach((func) => {
          transformedRecord = func(transformedRecord);
        });
        stringifier.write(transformedRecord);
        counter += 1;
        console.log(`Rows parsed: ${counter}`);
        record = parser.read();
      }
    });

  stringifier.on('readable', async () => {
    console.log('Writing');
    writeStream.write(stringifier.read());
  });

  readStream
    .on('error', (err) => {
      console.error(err);
    })
    .on('data', (chunk) => {
      parser.write(chunk);
    })
    .on('end', () => {
      parser.end();
    });

  writeStream
    .on('error', (err) => {
      console.error(err);
    })
    .on('close', () => {
      stringifier.end();
      console.log(`Time elapsed: ${1000 * (Date.now() - startTime)} seconds`);
    });
};

module.exports = {
  transformCSV,
};
