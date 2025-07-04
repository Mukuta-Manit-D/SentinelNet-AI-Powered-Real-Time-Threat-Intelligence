const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const AccessLog = require('../models/AccessLog');

// Log a ticket scan
router.post('/', async (req, res) => {
  const { code } = req.body;
  try {
    const ticket = await Ticket.findOne({ code });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    const log = new AccessLog({ ticket: ticket._id });
    await log.save();

    res.json({ message: 'Logged', log });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// (Optional) Get all access logs
router.get('/', async (req, res) => {
  const logs = await AccessLog.find().populate('ticket');
  res.json(logs);
});

module.exports = router;