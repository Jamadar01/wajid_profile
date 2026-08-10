const express   = require('express');
const Project   = require('../models/Project');
const authGuard = require('../middleware/auth');

const router = express.Router();

/* ?kind=personal | company — docs seeded before `kind` existed have no value,
   so they count as company work rather than disappearing. */
router.get('/', async (req, res) => {
  try {
    const { kind } = req.query;
    let filter = {};
    if (kind === 'personal')     filter = { kind: 'personal' };
    else if (kind === 'company') filter = { kind: { $ne: 'personal' } };

    const docs = await Project.find(filter).sort({ order: 1, createdAt: 1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authGuard, async (req, res) => {
  try {
    const doc = await Project.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', authGuard, async (req, res) => {
  try {
    const doc = await Project.findByIdAndUpdate(req.params.id, req.body, {
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
