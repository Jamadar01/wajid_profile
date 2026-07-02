const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  emoji:     { type: String, default: '🚀' },
  color:     { type: String, default: '#7C3AED' },
  glow:      { type: String },
  highlight: { type: String },
  ring:      { type: Boolean, default: false },
  size:      { type: Number, default: 70 },
  tech:      [{ type: String }],
  company:   { type: String },
  desc:      { type: String },
  problem:   { type: String },
  solution:  { type: String },
  result:    { type: String },
  liveUrl:   { type: String },
  repoUrl:   { type: String },
  order:     { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
