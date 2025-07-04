const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  scannedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AccessLog', accessLogSchema);