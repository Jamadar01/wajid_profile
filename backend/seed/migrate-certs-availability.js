/* Targeted migration for the certifications section and the open-to-work banner.
 *
 *   node seed/migrate-certs-availability.js            # dry run — prints the plan, writes nothing
 *   node seed/migrate-certs-availability.js --apply    # actually writes
 *
 * What it touches:
 *   Certification — upserted by name + issuer, so re-running does not
 *                   duplicate rows and does not clobber certs you added
 *                   yourself through the admin dashboard. Blank fields get
 *                   filled from the seed; pass --force-certs to also correct
 *                   fields whose value differs (e.g. a date the seed now knows
 *                   from the issuer's Open Badges assertion).
 *   Profile       — ONLY the `availability` subtree is written, and only
 *                   when it is missing. Your name, greeting, description,
 *                   resume link, image and social links are never touched.
 *                   Pass --force-availability to overwrite an existing one.
 *
 * What it does NOT touch: about, skills, experience, projects, hackathons,
 * recommendations, messages. Safe to run after migrate-projects.js, and
 * safe to run more than once.
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose      = require('mongoose');
const Profile       = require('../src/models/Profile');
const Certification = require('../src/models/Certification');
const { profileSeed, certificationsSeed } = require('./data');

const APPLY       = process.argv.includes('--apply');
const FORCE       = process.argv.includes('--force-availability');
const FORCE_CERTS = process.argv.includes('--force-certs');

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(APPLY ? 'Connected — APPLYING changes\n' : 'Connected — DRY RUN, nothing will be written\n');

  /* ── 1. Certifications: upsert on name + issuer ── */
  for (const cert of certificationsSeed) {
    const key      = { name: cert.name, issuer: cert.issuer };
    const existing = await Certification.findOne(key);

    if (existing) {
      /* Already there — leave your edits alone, but fill in verification
         fields that are still blank locally and now known in the seed.
         Without this, a row inserted before the Credly link existed would
         stay unverifiable forever. */
      const fillable = ['verifyUrl', 'badgeImage', 'credentialId', 'issued', 'expires', 'kind'];
      const patch = {};
      for (const key of fillable) {
        if (cert[key] === undefined || cert[key] === '') continue;
        /* default: only fill what is blank locally, so your admin edits survive.
           --force-certs also corrects values that differ from the seed, which is
           what you want after the seed gains verified dates from the issuer. */
        const isBlank = !existing[key];
        const differs = existing[key] !== cert[key];
        if (isBlank || (FORCE_CERTS && differs)) patch[key] = cert[key];
      }

      if (Object.keys(patch).length) {
        console.log(`  ${FORCE_CERTS ? 'UPDATE' : 'FILL  '}  ${cert.issuer} — ${cert.name}`);
        for (const [k, v] of Object.entries(patch)) console.log(`            ${k} = ${v}`);
        if (APPLY) await Certification.updateOne({ _id: existing._id }, { $set: patch });
      } else {
        console.log(`  SKIP    ${cert.issuer} — ${cert.name}  (already present, nothing to fill)`);
      }
      continue;
    }
    console.log(`  INSERT  ${cert.issuer} — ${cert.name} (${cert.issued})`);
    console.log(`            ${cert.skills.length} skills` +
                `${cert.verifyUrl ? '' : ', no verify URL yet'}` +
                `${cert.credentialId ? '' : ', no credential ID yet'}`);
    if (APPLY) await Certification.create(cert);
  }

  const certTotal = await Certification.countDocuments();
  console.log(`  → ${certTotal} certification${certTotal === 1 ? '' : 's'} in the database` +
              `${APPLY ? '' : ' (before this run)'}`);

  /* ── 2. Profile availability: only the one subtree ── */
  const profile = await Profile.findById('singleton');
  const hasAvailability = Boolean(profile?.availability?.headline);

  console.log('');
  if (!profile) {
    console.log('  WARN    no profile document — run seed/index.js first, or save Profile once at /admin');
  } else if (hasAvailability && !FORCE) {
    console.log('  SKIP    profile.availability already set — left as-is');
    console.log('            re-run with --force-availability to overwrite it from the seed');
  } else {
    const a = profileSeed.availability;
    console.log(`  ${hasAvailability ? 'OVERWRITE' : 'SET      '} profile.availability`);
    console.log(`            open=${a.open}  status="${a.status}"`);
    console.log(`            roles: ${a.roles.join(', ')}`);
    console.log(`            types: ${a.types.join(', ')}  |  locations: ${a.locations.join(', ')}`);
    console.log('            (nothing else on the profile is written)');
    if (APPLY) {
      await Profile.updateOne({ _id: 'singleton' }, { $set: { availability: a } });
    }
  }

  await mongoose.disconnect();
  console.log(APPLY
    ? '\nDone. Add your credential ID and verify URL at /admin → Certifications,\nand adjust the target roles at /admin → Profile.'
    : '\nDry run complete. Re-run with --apply to write these changes.');
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});
