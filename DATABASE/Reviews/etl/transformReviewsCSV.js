const path = require('path');
const { transformCSV } = require('./transformCSV');
const { transformDate } = require('./transformers');
const etlConfig = require('../../etlConfig');

/**
 * This module transforms the raw data from the reviews csv into a format ready for import into
 * the postgres DB. The timestamp in the reviews csv is in epoch time (ms since epoch), but
 * postgres wants an ISO 8601 format for datetime.
 */
const INPUT_DIR = etlConfig.REVIEWS_INPUT_DIR;
const INPUT_FILE = etlConfig.REVIEWS_INPUT_FILE_REVIEWS;

const OUTPUT_DIR = etlConfig.REVIEWS_TRANSFORM_OUTPUT_DIR;
const OUTPUT_FILE = etlConfig.REVIEWS_TRANSFORM_OUTPUT_FILE_REVIEWS;

const INPUT_PATH = path.join(INPUT_DIR, INPUT_FILE);
const OUTPUT_PATH = path.join(OUTPUT_DIR, OUTPUT_FILE);

transformCSV(INPUT_PATH, OUTPUT_PATH, transformDate);
