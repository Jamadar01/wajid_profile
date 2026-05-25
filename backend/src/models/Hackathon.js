const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  rank:      { type: String, required: true },
  name:      { type: String, required: true },
  org:       { type: String },
  desc:      { type: String },
  badges: [{
    label: String,
    cls:   String,
  }],
  color:    { type: String, default: '#FCD34D' },
  glow:     { type: String },
  emoji:    { type: String, default: '🏆' },
  orbitDur: { type: String, default: '10s' },
  order:    { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Hackathon', hackathonSchema);
