const express   = require('express');
const About     = require('../models/About');
const authGuard = require('../middleware/auth');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const doc = await About.findById('singleton');
    if (!doc) return res.status(404).json({ message: 'About not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/', authGuard, async (req, res) => {
  try {
    const doc = await About.findByIdAndUpdate(
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
