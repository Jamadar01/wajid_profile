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

  /* Drives the "open to work" banner and the hero status pill. Setting
     `open: false` hides the banner and switches the pill to `closedLabel`,
     so the site can be toggled without editing any component. */
  availability: {
    open:        { type: Boolean, default: true },
    status:      { type: String },      // short pill text, e.g. 'Actively interviewing'
    closedLabel: { type: String },      // pill text when open is false
    headline:    { type: String },      // banner heading
    blurb:       { type: String },      // one or two sentences
    roles:       [{ type: String }],    // target job titles
    types:       [{ type: String }],    // Full-time, Contract, …
    locations:   [{ type: String }],    // Remote, Mumbai, …
    startDate:   { type: String },      // 'Available from …' / notice period
    ctaLabel:    { type: String },
    ctaUrl:      { type: String },
  },
}, { _id: false });

module.exports = mongoose.model('Profile', profileSchema);
