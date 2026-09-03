const express    = require('express');
const mongoose   = require('mongoose');
const Experience = require('../models/Experience');
const Project    = require('../models/Project');
const authGuard  = require('../middleware/auth');
const slugify    = require('../utils/slugify');

const router = express.Router();

/* Slug is derived from the company name on create, but findByIdAndUpdate
   skips the model hook — so renames are normalised here instead. */
const withSlug = (body) => {
  if (body.slug || !body.company) return body;
  return { ...body, slug: slugify(body.company) };
};

router.get('/', async (_req, res) => {
  try {
    const docs = await Experience.find().sort({ order: 1, createdAt: 1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* Mission detail page — one experience plus every project shipped there.
   Accepts a slug ("wohlig-transformation") or a raw _id. Projects are
   matched on the `experience` link first, falling back to the legacy
   `company` name so docs seeded before the link existed still show up. */
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const query = mongoose.Types.ObjectId.isValid(idOrSlug)
      ? { $or: [{ _id: idOrSlug }, { slug: idOrSlug }] }
      : { slug: idOrSlug };

    let experience = await Experience.findOne(query);

    /* Docs saved before `slug` existed have none, and the hook only fills it
       on write — so fall back to matching the slugified company name. Keeps
       mission pages working without forcing a reseed. */
    if (!experience) {
      const all = await Experience.find({ slug: { $in: [null, ''] } });
      experience = all.find(e => slugify(e.company) === idOrSlug);
    }
    if (!experience) return res.status(404).json({ message: 'Not found' });

    const projects = await Project.find({
      kind: { $ne: 'personal' },
      $or: [{ experience: experience._id }, { company: experience.company }],
    }).sort({ order: 1, createdAt: 1 });

    res.json({ experience, projects });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authGuard, async (req, res) => {
  try {
    const doc = await Experience.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', authGuard, async (req, res) => {
  try {
    const doc = await Experience.findByIdAndUpdate(req.params.id, withSlug(req.body), {
      new: true, runValidators: true,
    });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', authGuard, async (req, res) => {
  try {
    const doc = await Experience.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    /* projects keep their `company` string but lose the dangling link */
    await Project.updateMany({ experience: doc._id }, { $unset: { experience: 1 } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
