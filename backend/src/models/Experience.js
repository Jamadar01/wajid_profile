const mongoose = require('mongoose');
const slugify  = require('../utils/slugify');

/* "Skills used at this company", grouped so the mission page can show
   Frontend / Backend / AI rather than one undifferentiated chip soup. */
const skillGroupSchema = new mongoose.Schema({
  label: { type: String, required: true },
  items: [{ type: String }],
}, { _id: false });

const experienceSchema = new mongoose.Schema({
  company:          { type: String, required: true },
  slug:             { type: String, index: true },
  role:             { type: String, required: true },
  duration:         { type: String, required: true },
  location:         { type: String },
  techStack:        { type: String },
  responsibilities: [{ type: String }],
  link:             { type: String },
  image:            { type: String },
  order:            { type: Number, default: 0 },

  /* mission detail page only — the homepage card ignores these */
  summary:     { type: String },
  skillGroups: [skillGroupSchema],
  impact:      [{ type: String }],
  color:       { type: String },
}, { timestamps: true });

experienceSchema.pre('validate', function fillSlug(next) {
  if (!this.slug && this.company) this.slug = slugify(this.company);
  next();
});

module.exports = mongoose.model('Experience', experienceSchema);
