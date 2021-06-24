/**
 * Load Questions
COPY "Questions"
FROM '/Users/jacobsantala/code/SDC/Data/questions.csv'
DELIMITER ','
CSV HEADER;

 * Load Answers
COPY "Answers"
FROM '/Users/jacobsantala/code/SDC/Data/answers.csv'
DELIMITER ','
CSV HEADER;

 * Load Photos
COPY "Photos"
FROM '/Users/jacobsantala/code/SDC/Data/answers_photos.csv'
DELIMITER ','
CSV HEADER;
 */
