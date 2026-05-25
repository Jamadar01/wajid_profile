const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  _id: { type: String, default: 'singleton' },
  statusChips: [{
    label: String,
    value: String,
    color: String,
  }],
  bio: [{ type: String }],
  hobbies: [{ type: String }],
  education: {
    school:  String,
    degree:  String,
    period:  String,
    cgpa:    String,
    location: String,
  },
  extracurriculars: [{
    role: String,
    org:  String,
    desc: String,
  }],
}, { _id: false });

module.exports = mongoose.model('About', aboutSchema);
