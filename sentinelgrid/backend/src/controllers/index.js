// backend/src/controllers/index.js

const userController = require('./userController');
const eventController = require('./eventController');
const incidentController = require('./incidentController');

module.exports = {
  ...userController,
  ...eventController,
  ...incidentController,
};