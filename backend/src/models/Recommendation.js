const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  signal:   { type: String, required: true, unique: true },
  quote:    { type: String, required: true },
  name:     { type: String, required: true },
  role:     { type: String },
  strength: { type: Number, min: 0, max: 100, default: 95 },
  color:    { type: String, default: '#8B5CF6' },
  order:    { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', recommendationSchema);
