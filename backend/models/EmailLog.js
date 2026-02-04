const mongoose = require('mongoose');

const emailLogSchema = mongoose.Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  invoiceNumber: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // 🟢 Added Project Link
  sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'Sent' },
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EmailLog', emailLogSchema);