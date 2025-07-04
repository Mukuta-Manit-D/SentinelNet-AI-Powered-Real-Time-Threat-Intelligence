const express = require('express');
const router = express.Router();
const Zone = require('../models/Zone');

// Get all zones
router.get('/', async (req, res) => {
  const zones = await Zone.find();
  res.json(zones);
});

// Get zone by ID
router.get('/:id', async (req, res) => {
  const zone = await Zone.findById(req.params.id);
  if (!zone) return res.status(404).json({ message: 'Zone not found' });
  res.json(zone);
});

// Create zone
router.post('/', async (req, res) => {
  try {
    const zone = new Zone(req.body);
    await zone.save();
    res.status(201).json(zone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update zone
router.put('/:id', async (req, res) => {
  try {
    const zone = await Zone.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!zone) return res.status(404).json({ message: 'Zone not found' });
    res.json(zone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete zone
router.delete('/:id', async (req, res) => {
  const zone = await Zone.findByIdAndDelete(req.params.id);
  if (!zone) return res.status(404).json({ message: 'Zone not found' });
  res.json({ message: 'Zone deleted' });
});

module.exports = router;