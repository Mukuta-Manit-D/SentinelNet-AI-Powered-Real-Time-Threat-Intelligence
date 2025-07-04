const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

// Get all alerts
router.get('/', async (req, res) => {
  const alerts = await Alert.find().populate('triggeredBy relatedZone');
  res.json(alerts);
});

// Get alert by ID
router.get('/:id', async (req, res) => {
  const alert = await Alert.findById(req.params.id).populate('triggeredBy relatedZone');
  if (!alert) return res.status(404).json({ message: 'Alert not found' });
  res.json(alert);
});

// Create alert
router.post('/', async (req, res) => {
  try {
    const alert = new Alert(req.body);
    await alert.save();
    res.status(201).json(alert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update alert
router.put('/:id', async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    res.json(alert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete alert
router.delete('/:id', async (req, res) => {
  const alert = await Alert.findByIdAndDelete(req.params.id);
  if (!alert) return res.status(404).json({ message: 'Alert not found' });
  res.json({ message: 'Alert deleted' });
});

module.exports = router;