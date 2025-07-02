// backend/src/routes/index.js

const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

// User routes
router.get('/users', controllers.getUsers);
router.post('/users', controllers.createUser);

// Event routes
router.get('/events', controllers.getEvents);
router.post('/events', controllers.createEvent);

// Incident routes
router.get('/incidents', controllers.getIncidents);
router.post('/incidents', controllers.createIncident);

module.exports = router;