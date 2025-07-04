const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Get all tickets
router.get('/', async (req, res) => {
  const tickets = await Ticket.find().populate('user zone');
  res.json(tickets);
});

// Get ticket by ID
router.get('/:id', async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).populate('user zone');
  if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
  res.json(ticket);
});

// Create ticket
router.post('/', async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update ticket
router.put('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete ticket
router.delete('/:id', async (req, res) => {
  const ticket = await Ticket.findByIdAndDelete(req.params.id);
  if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
  res.json({ message: 'Ticket deleted' });
});

module.exports = router;