const express   = require('express');
const Message   = require('../models/Message');
const authGuard = require('../middleware/auth');

const router = express.Router();

// Public — visitors submit the contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, body } = req.body;
    if (!name || !email || !body) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }
    const doc = await Message.create({ name, email, subject, body });
    res.status(201).json({ message: 'Sent', id: doc._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', authGuard, async (_req, res) => {
  try {
    const docs = await Message.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id/read', authGuard, async (req, res) => {
  try {
    const doc = await Message.findByIdAndUpdate(
      req.params.id,
      { read: req.body.read !== false },
      { new: true },
    );
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', authGuard, async (req, res) => {
  try {
    const doc = await Message.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
