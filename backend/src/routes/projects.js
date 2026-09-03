const express   = require('express');
const mongoose  = require('mongoose');
const Project   = require('../models/Project');
const authGuard = require('../middleware/auth');
const slugify   = require('../utils/slugify');

const router = express.Router();

/* findByIdAndUpdate bypasses the model hook, so renames are normalised here */
const withSlug = (body) => {
  if (body.slug || !body.name) return body;
  return { ...body, slug: slugify(body.name) };
};

/* An empty `experience` from a form must clear the link, not fail to cast */
const withExperience = (body) => {
  if (!('experience' in body)) return body;
  const id = body.experience;
  return { ...body, experience: mongoose.Types.ObjectId.isValid(id) ? id : null };
};

const clean = (body) => withExperience(withSlug(body));

/* ?kind=personal | company — docs seeded before `kind` existed have no value,
   so they count as company work rather than disappearing.
   ?experience=<id> narrows to one mission's projects. */
router.get('/', async (req, res) => {
  try {
    const { kind, experience } = req.query;
    const filter = {};
    if (kind === 'personal')     filter.kind = 'personal';
    else if (kind === 'company') filter.kind = { $ne: 'personal' };
    if (mongoose.Types.ObjectId.isValid(experience)) filter.experience = experience;

    const docs = await Project.find(filter).sort({ order: 1, createdAt: 1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authGuard, async (req, res) => {
  try {
    const doc = await Project.create(clean(req.body));
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', authGuard, async (req, res) => {
  try {
    const doc = await Project.findByIdAndUpdate(req.params.id, clean(req.body), {
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
    const doc = await Project.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
