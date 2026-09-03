const mongoose = require('mongoose');
const slugify  = require('../utils/slugify');

/* One row of the architecture diagram on a project's detail card:
   a named layer, the tech sitting in it, and one line on what it does. */
const architectureLayerSchema = new mongoose.Schema({
  layer: { type: String, required: true },
  tech:  [{ type: String }],
  note:  { type: String },
}, { _id: false });

const projectSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  slug:      { type: String, index: true },
  kind:      { type: String, enum: ['company', 'personal'], default: 'company', index: true },
  emoji:     { type: String, default: '🚀' },
  color:     { type: String, default: '#7C3AED' },
  glow:      { type: String },
  highlight: { type: String },
  ring:      { type: Boolean, default: false },
  size:      { type: Number, default: 70 },
  tech:      [{ type: String }],

  /* company work: `company` stays as the display name so old docs keep
     rendering, `experience` is the hard link to the mission it belongs to */
  company:    { type: String },
  experience: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience', index: true },
  role:       { type: String },
  timeline:   { type: String },

  desc:      { type: String },
  problem:   { type: String },
  solution:  { type: String },
  result:    { type: String },

  architecture: [architectureLayerSchema],
  highlights:   [{ type: String }],

  /* scaffolded entry awaiting real detail — the UI labels it instead of
     presenting placeholder copy as fact */
  draft:     { type: Boolean, default: false },

  liveUrl:   { type: String },
  repoUrl:   { type: String },
  order:     { type: Number, default: 0 },
}, { timestamps: true });

/* `validate` rather than `save` so insertMany in the seed fills slugs too */
projectSchema.pre('validate', function fillSlug(next) {
  if (!this.slug && this.name) this.slug = slugify(this.name);
  next();
});

module.exports = mongoose.model('Project', projectSchema);
