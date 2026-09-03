const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  issuer:       { type: String, required: true },
  /* Credly hosts both full certifications and smaller skill badges. Keeping
     them apart means a skill badge is never presented as a professional
     certification, while both still live in the same section. */
  kind:         { type: String, enum: ['certification', 'achievement'], default: 'certification' },
  issued:       { type: String },   // 'Mar 2025' — free text, not a Date, to match the rest of the site
  expires:      { type: String },   // blank = does not expire
  credentialId: { type: String },
  verifyUrl:    { type: String },   // issuer's verification page
  badgeImage:   { type: String },   // /images/... or an absolute URL; falls back to `emoji`
  emoji:        { type: String, default: '📜' },
  color:        { type: String, default: '#38BDF8' },
  glow:         { type: String },
  skills:       [{ type: String }],
  desc:         { type: String },
  order:        { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Certification', certificationSchema);
