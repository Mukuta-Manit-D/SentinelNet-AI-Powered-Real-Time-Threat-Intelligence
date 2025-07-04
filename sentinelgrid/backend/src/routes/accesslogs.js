const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const AccessLog = require('../models/AccessLog');
const Alert = require('../models/Alert'); // Make sure you have an Alert model
const Zone = require('../models/Zone'); // Assuming you have a Zone model

// Log a ticket scan
router.post('/', async (req, res) => {
  const { code } = req.body;
  try {
    const ticket = await Ticket.findOne({ code });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    // Save access log
    const log = new AccessLog({ ticket: ticket._id });
    await log.save();

    // --- Rule: Zone Over-Capacity ---
    // 1. Find the zone for this ticket
    const zone = await Zone.findById(ticket.zone);
    if (zone) {
      // 2. Count access logs for this zone in the last hour (or current session)
      const count = await AccessLog.countDocuments({
        ticket: { $in: await Ticket.find({ zone: zone._id }).distinct('_id') },
        scannedAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) } // last 1 hour
      });

      if (count > zone.capacity) {
        // 3. Create an alert if over capacity
        await Alert.create({
          type: 'Zone Over-Capacity',
          message: `Zone "${zone.name}" is over capacity!`,
          relatedZone: zone._id,
          resolved: false
        });
      }
    }

    // --- Rule: Frequent Scans by Same Ticket ---
    // Count scans for this ticket in the last 10 minutes
    const recentScanCount = await AccessLog.countDocuments({
      ticket: ticket._id,
      scannedAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) } // last 10 minutes
    });

    if (recentScanCount > 5) {
      await Alert.create({
        type: 'Frequent Scans',
        message: `Ticket ${ticket.code} scanned more than 5 times in 10 minutes.`,
        triggeredBy: ticket.user,
        relatedZone: ticket.zone,
        resolved: false
      });
    }

    // --- Rule: Suspicious Activity (e.g., ticket used in multiple zones in 1 hour) ---
    // Find distinct zones this ticket was used in the last hour
    const logsLastHour = await AccessLog.find({
      ticket: ticket._id,
      scannedAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) }
    }).populate('ticket');

    const uniqueZones = new Set(
      await Promise.all(
        logsLastHour.map(async log => {
          const t = await Ticket.findById(log.ticket._id);
          return t.zone.toString();
        })
      )
    );

    if (uniqueZones.size > 1) {
      await Alert.create({
        type: 'Suspicious Activity',
        message: `Ticket ${ticket.code} used in multiple zones within 1 hour.`,
        triggeredBy: ticket.user,
        relatedZone: ticket.zone,
        resolved: false
      });
    }

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