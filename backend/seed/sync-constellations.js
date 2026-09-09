/* Bring the skill constellations back in line with the skill groups.
 *
 *   node seed/sync-constellations.js            preview only, writes nothing
 *   node seed/sync-constellations.js --write    apply it
 *   node seed/sync-constellations.js --write --relayout
 *
 * Saving from the admin dashboard now syncs on its own; this is for the
 * backlog — the drift that built up before, and any time the two lists need
 * reconciling without going through the editor.
 *
 * `--relayout` recomputes every star coordinate instead of keeping the ones
 * placed by hand. Worth it once the group count has changed a lot, since the
 * old positions were laid out for a different number of constellations.
 *
 * Dry by default: this rewrites the star map, and the aliases attached to it
 * are hand-curated, so the destructive direction is the one you opt into.
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Skill = require('../src/models/Skill');
const { syncConstellations } = require('../src/utils/skillSync');

const argv = process.argv.slice(2);
const write = argv.includes('--write');
const relayout = argv.includes('--relayout');

const bullet = (list, limit = 40) => list
  .slice(0, limit)
  .map(x => '    + ' + x)
  .join('\n') + (list.length > limit ? `\n    … and ${list.length - limit} more` : '');

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not set — check backend/.env');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB\n');

  const doc = await Skill.findById('singleton').lean();
  if (!doc) throw new Error('No skills document found. Run `npm run seed` first.');

  const groups = doc.groups || [];
  const before = doc.constellations || [];

  const { constellations, report } = syncConstellations(groups, before, { relayout });

  const starsBefore = before.reduce((n, c) => n + (c.stars || []).length, 0);
  const starsAfter = constellations.reduce((n, c) => n + c.stars.length, 0);

  console.log(`groups         ${groups.length} · ${groups.reduce((n, g) => n + (g.skills || []).length, 0)} skills`);
  console.log(`constellations ${before.length} → ${constellations.length}`);
  console.log(`stars          ${starsBefore} → ${starsAfter}\n`);

  if (report.groupsAdded.length) {
    console.log(`New constellations (${report.groupsAdded.length}):`);
    console.log(bullet(report.groupsAdded) + '\n');
  }
  if (report.groupsRemoved.length) {
    console.log(`Dropped, no longer a group (${report.groupsRemoved.length}):`);
    console.log(bullet(report.groupsRemoved) + '\n');
  }
  if (report.added.length) {
    console.log(`New stars (${report.added.length}):`);
    console.log(bullet(report.added) + '\n');
  }
  if (report.removed.length) {
    console.log(`Stars dropped, skill no longer in any group (${report.removed.length}):`);
    console.log(bullet(report.removed) + '\n');
  }

  /* Aliases are the one thing here that cannot be regenerated, so say plainly
     whether any were about to be lost. */
  const aliasBefore = before.flatMap(c => (c.stars || []).filter(s => (s.aliases || []).length));
  const aliasAfter = constellations.flatMap(c => c.stars.filter(s => s.aliases.length));
  console.log(`aliases carried over: ${aliasAfter.length} of ${aliasBefore.length} starred skills\n`);

  if (!write) {
    console.log('Preview only — nothing written. Re-run with --write to apply.');
    return;
  }

  await Skill.findByIdAndUpdate('singleton', { constellations }, { runValidators: true });
  console.log('Written.');
}

main()
  .catch(err => {
    console.error('\nFailed:', err.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
