const mongoose = require('mongoose');
const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: {
    type: String,
    enum: ['academic', 'placement', 'society', 'alumni'],
    required: true,
  },
  tags: [String],
  fileUrls: [String],
  deadline: { type: Date, required: false },
  publishTime: Date,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'approved'], default: 'approved' },
}, { timestamps: true });

module.exports = mongoose.model('News', NewsSchema);
