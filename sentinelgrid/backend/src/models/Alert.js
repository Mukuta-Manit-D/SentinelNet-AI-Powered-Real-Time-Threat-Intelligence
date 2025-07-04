const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., "rule", "manual"
  message: { type: String, required: true },
  triggeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  relatedZone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone' },
  createdAt: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Alert', alertSchema);