/* Targeted migration for the mission-log / planet-system change.
 *
 *   node seed/migrate-projects.js            # dry run — prints the plan, writes nothing
 *   node seed/migrate-projects.js --apply    # actually writes
 *
 * What it touches:
 *   Experience — updated IN PLACE, matched on company name. Adds slug,
 *                summary, skillGroups, impact and color. Existing role,
 *                duration, responsibilities, link and image are left alone.
 *   Project    — ALL project docs are replaced with the new company
 *                scaffolds + personal builds.
 *
 * What it does NOT touch: profile, about, skills, hackathons,
 * recommendations, messages. Use this instead of seed/index.js when you
 * have edited those collections through the admin dashboard.
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose  = require('mongoose');
const Experience = require('../src/models/Experience');
const Project    = require('../src/models/Project');
const slugify    = require('../src/utils/slugify');

const APPLY = process.argv.includes('--apply');

/* Pull the seed data straight out of seed/index.js so there is only one
   copy of it. The seed module connects and writes when required directly,
   so the arrays are re-declared here by reading the file instead. */
const { experienceSeed, companyProjectsSeed, personalProjectsSeed } = require('./data');

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(APPLY ? 'Connected — APPLYING changes\n' : 'Connected — DRY RUN, nothing will be written\n');

  /* ── 1. Experiences: update in place, keyed on company name ── */
  const expId = {};
  for (const seed of experienceSeed) {
    const existing = await Experience.findOne({ company: seed.company });

    const patch = {
      slug:        seed.slug || slugify(seed.company),
      summary:     seed.summary,
      skillGroups: seed.skillGroups,
      impact:      seed.impact,
      color:       seed.color,
    };

    if (existing) {
      console.log(`  UPDATE  ${seed.company}`);
      console.log(`            slug=${patch.slug}  skillGroups=${patch.skillGroups.length}  color=${patch.color}`);
      if (APPLY) await Experience.updateOne({ _id: existing._id }, { $set: patch });
      expId[seed.company] = existing._id;
    } else {
      console.log(`  INSERT  ${seed.company}  (not in the database yet)`);
      if (APPLY) {
        const created = await Experience.create(seed);
        expId[seed.company] = created._id;
      } else {
        expId[seed.company] = new mongoose.Types.ObjectId();
      }
    }
  }

  /* Any experience in the DB that the seed does not know about keeps its
     data but still needs a slug, or its mission page cannot be opened. */
  const unslugged = await Experience.find({ slug: { $in: [null, ''] } });
  for (const doc of unslugged) {
    if (expId[doc.company]) continue;
    const slug = slugify(doc.company);
    console.log(`  SLUG    ${doc.company} → ${slug}  (kept as-is otherwise)`);
    if (APPLY) await Experience.updateOne({ _id: doc._id }, { $set: { slug } });
  }

  /* ── 2. Projects: full replacement ── */
  const company  = companyProjectsSeed(expId);
  const incoming = [...company, ...personalProjectsSeed];
  const oldCount = await Project.countDocuments();

  console.log(`\n  DELETE  ${oldCount} existing project${oldCount === 1 ? '' : 's'}`);
  console.log(`  INSERT  ${company.length} company scaffolds (draft), ${personalProjectsSeed.length} personal builds`);
  for (const p of incoming) {
    console.log(`            ${p.draft ? '[draft] ' : '        '}${p.kind.padEnd(8)} ${p.name}`);
  }

  if (APPLY) {
    await Project.deleteMany({});
    await Project.insertMany(incoming);
  }

  await mongoose.disconnect();
  console.log(APPLY
    ? '\nDone. Company projects are DRAFTS — fill them in at /admin → Projects.'
    : '\nDry run complete. Re-run with --apply to write these changes.');
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});
