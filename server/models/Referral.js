const mongoose = require('mongoose');

const ReferralRequestSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  alumni: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  resumeUrl: { type: String }, // resume file
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  feedback: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('ReferralRequest', ReferralRequestSchema);
