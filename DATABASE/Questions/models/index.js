const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(`postgres://${config.username}@${config.host}:${config.port}/${config.database}`);

module.exports.sequelize = sequelize;
