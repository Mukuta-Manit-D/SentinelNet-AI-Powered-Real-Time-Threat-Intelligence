// backend/src/controllers/index.js

const UserController = require('./userController');
const EventController = require('./eventController');
const IncidentController = require('./incidentController');

module.exports = {
    UserController,
    EventController,
    IncidentController
};