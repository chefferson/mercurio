/**
 * This module contains functions that take in a record (in the form of an object) and apply a
 * transformation to the data, returning a processed record in the same format (i.e. as a record
 * object).
 */

module.exports.transformDate = (record) => {
  const date = new Date(Number.parseInt(record.date, 10));
  return {
    ...record,
    date: date.toISOString(),
  };
};
