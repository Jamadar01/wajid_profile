/* Matching skill names against project tech tags.
 *
 * The two vocabularies drifted naturally: a skill is "React.js" while a
 * project is tagged "React" or "React 19"; a skill is "WebSockets" while a
 * project says "WebSocket". Rather than force one spelling everywhere, both
 * sides are reduced to a small set of comparable keys.
 *
 * Anything the rules cannot reach (GCP vs "Google Cloud Platform") is handled
 * by the per-star `aliases` list, editable in the admin dashboard.
 */

/* Reduce a tech name to a comparison key:
 *   "React.js"   -> "react"      (drop a .js suffix)
 *   "React 19"   -> "react"      (drop a trailing version)
 *   "CSS3"       -> "css"
 *   "C++"        -> "c++"        (+ and # survive, for C++ / C#)
 *   "REST APIs"  -> "restapis"
 */
function normalise(value = '') {
  return String(value)
    .toLowerCase()
    .replace(/\.js\b/g, '')
    .replace(/[^a-z0-9+#]/g, '')
    .replace(/\d+$/, '');
}

/* Both the singular and plural form, so "WebSockets" reaches "WebSocket"
   without a hand-written alias. Adding both forms on both sides keeps words
   that genuinely end in s (Redis) matching themselves.
 *
 * Only for names of four characters or more: on short ones the extra form
 * collides badly — "C" would grow a "cs" key and match "CSS", which is how
 * the language C ended up credited to a Bootstrap project. */
const PLURAL_MIN = 4;

function keysFor(value = '') {
  const base = normalise(value);
  if (!base) return [];
  const keys = [base];
  if (base.length >= PLURAL_MIN) {
    keys.push(base.endsWith('s') ? base.slice(0, -1) : base + 's');
  }
  return keys;
}

/* Every key a skill answers to: its label, plus any aliases. */
function skillKeys(star = {}) {
  const sources = [star.label, ...(star.aliases || [])];
  return new Set(sources.flatMap(keysFor));
}

/* Every key a project offers: its tech tags. */
function projectKeys(project = {}) {
  return new Set((project.tech || []).flatMap(keysFor));
}

function matches(star, project) {
  const skill = skillKeys(star);
  for (const key of projectKeys(project)) {
    if (skill.has(key)) return true;
  }
  return false;
}

module.exports = { normalise, keysFor, skillKeys, projectKeys, matches };
