const express   = require('express');
const Skill     = require('../models/Skill');
const authGuard = require('../middleware/auth');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const doc = await Skill.findById('singleton');
    if (!doc) return res.status(404).json({ message: 'Skills not found' });
    res.json({ groups: doc.groups });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/constellations', async (_req, res) => {
  try {
    const doc = await Skill.findById('singleton');
    if (!doc) return res.status(404).json({ message: 'Skills not found' });
    res.json({ constellations: doc.constellations });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/', authGuard, async (req, res) => {
  try {
    const doc = await Skill.findByIdAndUpdate(
      'singleton',
      { ...req.body, _id: 'singleton' },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
