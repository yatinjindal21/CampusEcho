const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'society_head', 'admin', 'alumni'],
    default: 'student',
  },
  society: { type: String },
  company: { type: String }, // ✅ for alumni
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);