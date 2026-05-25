const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  _id: { type: String, default: 'singleton' },
  name:        { type: String, required: true },
  greeting:    { type: String, default: 'Hello, Universe' },
  typedStrings: [{ type: String }],
  description: { type: String },
  resumeLink:  { type: String },
  profileImage: { type: String, default: '/images/profile.JPG' },
  social: {
    email:    String,
    github:   String,
    linkedin: String,
  },
}, { _id: false });

module.exports = mongoose.model('Profile', profileSchema);
