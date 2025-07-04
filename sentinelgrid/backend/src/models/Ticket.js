const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone' },
  validFrom: Date,
  validTo: Date,
  status: { type: String, enum: ['active', 'used', 'expired'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);