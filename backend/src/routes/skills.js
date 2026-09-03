const express    = require('express');
const Skill      = require('../models/Skill');
const Project    = require('../models/Project');
const Experience = require('../models/Experience');
const authGuard  = require('../middleware/auth');
const { matches } = require('../utils/techMatch');

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

/* Skill tree — the constellations with every star carrying the projects that
   actually use it, so the interactive map needs one request and every click
   is instant. Company projects also carry the mission slug they live under,
   so the UI can deep-link into /mission/<slug>#<project-slug>. */
router.get('/tree', async (_req, res) => {
  try {
    const doc = await Skill.findById('singleton');
    if (!doc) return res.status(404).json({ message: 'Skills not found' });

    const [projects, experiences] = await Promise.all([
      Project.find().sort({ order: 1, createdAt: 1 }).lean(),
      Experience.find().select('slug company').lean(),
    ]);

    const missionSlug = new Map(
      experiences.map(e => [String(e._id), e.slug])
    );

    /* only the fields the card needs — no case-study prose over the wire */
    const summarise = (p) => ({
      _id:      p._id,
      name:     p.name,
      slug:     p.slug,
      kind:     p.kind === 'personal' ? 'personal' : 'company',
      emoji:    p.emoji,
      color:    p.color,
      tech:     p.tech || [],
      draft:    Boolean(p.draft),
      company:  p.company || '',
      liveUrl:  p.liveUrl || '',
      repoUrl:  p.repoUrl || '',
      missionSlug: p.experience ? missionSlug.get(String(p.experience)) || '' : '',
    });

    const constellations = doc.constellations.map(c => ({
      name:  c.name,
      color: c.color,
      lines: c.lines,
      stars: c.stars.map(star => {
        const hits = projects.filter(p => matches(star, p));
        return {
          id: star.id, label: star.label, x: star.x, y: star.y, r: star.r,
          aliases: star.aliases || [],
          projects: hits.map(summarise),
          projectCount: hits.length,
        };
      }),
    }));

    res.json({ constellations });
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
