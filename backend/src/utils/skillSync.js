/* Deriving the skill constellations from the skill groups.
 *
 * The two lists describe the same thing twice: `groups` is the plain list the
 * Skills section reads, `constellations` is the star map. Nothing kept them in
 * step, so they drifted — the groups grew to 45 skills across 8 categories
 * while the map still showed 26 stars across 6, and whole groups
 * ("Real-time", "Cloud Technologies") had no constellation at all.
 *
 * Groups are the source of truth. A constellation exists for each group, a
 * star for each skill in it. What the map owns and this never invents is the
 * curated part — `aliases`, which drive project matching, and (by default)
 * hand-placed coordinates.
 */

const slugify = require('./slugify');
const { normalise } = require('./techMatch');

/* Assigned by position, so a constellation keeps its colour as long as it
   keeps its place in the list. Existing ones keep the colour they have. */
const PALETTE = [
  '#A78BFA', '#38BDF8', '#34D399', '#FBBF24', '#F472B6',
  '#60A5FA', '#F87171', '#2DD4BF', '#C084FC', '#4ADE80',
];

/* The sky the frontend draws into. x and y are both 0-100 here; SkillMap.js
   compresses y for its wide panel, which is a view concern, not a data one. */
const SKY = 100;
const MARGIN = 6;      // keep stars off the panel edge
const CELL_PAD = 3;    // gap between neighbouring constellations

/* Hue in degrees, for telling palette entries apart. Exact-match dedupe is not
   enough: #FCD34D and #FBBF24 are different strings and the same amber to the
   eye, and colour is the only thing marking one constellation from another. */
function hueOf(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  const r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  if (!d) return 0;
  let h;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return (h * 60 + 360) % 360;
}

/* Smallest angle between two hues, 0-180. */
function hueGap(a, b) {
  if (a == null || b == null) return 360;
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

const MIN_HUE_GAP = 25;

/* Skill names are typed by hand in the admin editor and arrive with stray
   whitespace and trailing full stops ("PHP.", "Terraform."). Those would
   become star labels, so they are cleaned here rather than in the view. */
function cleanLabel(value) {
  return String(value == null ? '' : value).trim().replace(/\.+$/, '').trim();
}

/* Deterministic 0..1 from a string — same skill, same jitter, every run. */
function hashUnit(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

/* A grid over the sky, one cell per constellation. Near-square, so cells stay
   roughly as wide as they are tall whatever the group count. */
function cellFor(index, total) {
  const cols = Math.ceil(Math.sqrt(total));
  const rows = Math.ceil(total / cols);
  const col = index % cols;
  const row = Math.floor(index / cols);

  const usable = SKY - MARGIN * 2;
  const w = usable / cols;
  const h = usable / rows;

  return {
    x: MARGIN + col * w + CELL_PAD,
    y: MARGIN + row * h + CELL_PAD,
    w: Math.max(w - CELL_PAD * 2, 6),
    h: Math.max(h - CELL_PAD * 2, 6),
  };
}

/* Stars ringed around the cell centre, jittered so the result reads as a
   constellation rather than a clock face. */
function ringPosition(cell, i, count, seed) {
  const cx = cell.x + cell.w / 2;
  const cy = cell.y + cell.h / 2;
  const clamp = (v) => Math.max(MARGIN, Math.min(SKY - MARGIN, v));

  if (count === 1) return { x: +cx.toFixed(1), y: +cy.toFixed(1) };

  const angle = (i / count) * Math.PI * 2 + hashUnit(seed) * 0.9;
  /* Two radii alternating gives the outline depth; one radius puts every star
     on a single circle. */
  const spread = 0.34 + (i % 2) * 0.13 + hashUnit(seed + 'r') * 0.10;

  return {
    x: +clamp(cx + Math.cos(angle) * cell.w * spread).toFixed(1),
    y: +clamp(cy + Math.sin(angle) * cell.h * spread).toFixed(1),
  };
}

/* Chain the stars in ring order and close the loop. Three or more get a closed
   shape; two get a single line. */
function linesFor(stars) {
  if (stars.length < 2) return [];
  const ids = stars.map(s => s.id);
  const out = ids.slice(0, -1).map((id, i) => [id, ids[i + 1]]);
  if (ids.length > 2) out.push([ids[ids.length - 1], ids[0]]);
  return out;
}

/**
 * Build the constellation list that matches `groups`.
 *
 * @param groups    source list, [{ label, skills: [] }]
 * @param existing  current constellations, for aliases / positions / colours
 * @param opts.relayout  recompute every coordinate instead of keeping the
 *                       hand-placed ones. Off by default: editing one group
 *                       should not rearrange the whole sky.
 * @returns { constellations, report }
 */
function syncConstellations(groups, existing, opts) {
  const src = Array.isArray(groups) ? groups : [];
  const prev = Array.isArray(existing) ? existing : [];
  const relayout = Boolean(opts && opts.relayout);

  /* Existing stars indexed by normalised label, so a star survives its group
     being renamed or a skill moving between groups, and "React.js" finds its
     star whatever spelling the group uses. */
  const priorStars = new Map();
  prev.forEach(c => (c.stars || []).forEach(s => {
    const key = normalise(s.label);
    if (key && !priorStars.has(key)) priorStars.set(key, s);
  }));

  const priorByName = new Map(prev.map(c => [c.name, c]));
  const usedIds = new Set();
  const seenLabels = new Set();
  const report = { added: [], removed: [], groupsAdded: [], groupsRemoved: [] };

  /* Colours: a constellation that already exists keeps its own, so only the
     new ones draw from the palette — and they have to skip whatever the kept
     ones are using, or a new group lands on a colour already on screen. */
  const takenHues = [];
  src.forEach(g => {
    const p = priorByName.get(cleanLabel(g.label));
    if (p && p.color) takenHues.push(hueOf(p.color));
  });
  let paletteCursor = 0;
  const nextColor = () => {
    for (let pass = 0; pass < 2; pass++) {
      /* First pass demands a clear hue gap; if the palette runs out of room,
         the second accepts anything not already used exactly. */
      const gap = pass === 0 ? MIN_HUE_GAP : 0;
      for (let i = 0; i < PALETTE.length; i++) {
        const candidate = PALETTE[(paletteCursor + i) % PALETTE.length];
        const hue = hueOf(candidate);
        if (takenHues.every(t => hueGap(t, hue) > gap)) {
          paletteCursor = (paletteCursor + i + 1) % PALETTE.length;
          takenHues.push(hue);
          return candidate;
        }
      }
    }
    /* More constellations than the palette can distinguish — repeats are
       unavoidable at that point. */
    return PALETTE[takenHues.length % PALETTE.length];
  };

  /* A skill can legitimately sit in two groups (Pinecone is both a database
     and an AI tool). Both get a star, but they must not inherit the same
     coordinates and stack on top of each other. */
  const usedPoints = new Set();
  const pointKey = (x, y) => x.toFixed(1) + ',' + y.toFixed(1);

  const constellations = src.map((group, gi) => {
    const name = cleanLabel(group.label);
    const prior = priorByName.get(name);
    const cell = cellFor(gi, src.length);

    if (!prior) report.groupsAdded.push(name);

    const labels = (group.skills || [])
      .map(cleanLabel)
      .filter(Boolean)
      /* A skill listed twice in one group would collide on id. */
      .filter((label, i, all) => all.findIndex(l => normalise(l) === normalise(label)) === i);

    const stars = labels.map((label, si) => {
      const key = normalise(label);
      seenLabels.add(key);
      const old = priorStars.get(key);

      /* Ids must be unique across the whole sky: `lines` reference them
         globally and the frontend keys React children by them. */
      let id = (old && old.id) || slugify(label) || 'g' + gi + 's' + si;
      while (usedIds.has(id)) id = id + '-' + gi + si;
      usedIds.add(id);

      const keepPlace = !relayout && old && typeof old.x === 'number' && typeof old.y === 'number';
      let placed = keepPlace
        ? { x: old.x, y: old.y }
        : ringPosition(cell, si, labels.length, name + ':' + label);
      if (usedPoints.has(pointKey(placed.x, placed.y))) {
        placed = ringPosition(cell, si, labels.length, name + ':' + label + ':dup');
      }
      usedPoints.add(pointKey(placed.x, placed.y));

      if (!old) report.added.push(name + ' · ' + label);

      return {
        id,
        label,
        x: placed.x,
        y: placed.y,
        r: (old && typeof old.r === 'number') ? old.r : +(0.8 + hashUnit(label) * 0.35).toFixed(2),
        aliases: (old && old.aliases) || [],
      };
    });

    /* Hand-drawn lines survive while the star set is untouched; once a star
       comes or goes the old pairs can dangle, so the shape is redrawn. */
    const sameStars =
      prior &&
      (prior.stars || []).length === stars.length &&
      (prior.stars || []).every((s, i) => normalise(s.label) === normalise(stars[i].label));

    return {
      name,
      color: (prior && prior.color) || nextColor(),
      stars,
      lines: (sameStars && (prior.lines || []).length) ? prior.lines : linesFor(stars),
    };
  });

  const groupNames = new Set(constellations.map(c => c.name));
  prev.forEach(c => {
    if (!groupNames.has(c.name)) report.groupsRemoved.push(c.name);
    (c.stars || []).forEach(s => {
      if (!seenLabels.has(normalise(s.label))) report.removed.push(c.name + ' · ' + s.label);
    });
  });

  return { constellations, report };
}

module.exports = { syncConstellations, cleanLabel, PALETTE };
