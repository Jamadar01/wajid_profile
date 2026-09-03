const mongoose = require('mongoose');

const starSchema = new mongoose.Schema({
  id:    { type: String, required: true },
  label: { type: String, required: true },
  x:     { type: Number, required: true },
  y:     { type: Number, required: true },
  r:     { type: Number, default: 1.0 },
  /* Extra spellings this skill answers to when matching project tech tags.
     The normaliser already handles React.js/React 19 and singular/plural, so
     this is only for names it cannot reach — GCP vs "Google Cloud Platform". */
  aliases: [{ type: String }],
}, { _id: false });

const skillSchema = new mongoose.Schema({
  _id: { type: String, default: 'singleton' },
  groups: [{
    label:  { type: String, required: true },
    skills: [{ type: String }],
  }],
  constellations: [{
    name:  { type: String, required: true },
    color: { type: String, default: '#A78BFA' },
    stars: [starSchema],
    lines: [[{ type: String }]],
  }],
}, { _id: false });

module.exports = mongoose.model('Skill', skillSchema);
