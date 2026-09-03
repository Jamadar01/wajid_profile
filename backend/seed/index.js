require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose       = require('mongoose');
const Profile        = require('../src/models/Profile');
const About          = require('../src/models/About');
const Experience     = require('../src/models/Experience');
const Project        = require('../src/models/Project');
const Skill          = require('../src/models/Skill');
const Hackathon      = require('../src/models/Hackathon');
const Certification  = require('../src/models/Certification');
const Recommendation = require('../src/models/Recommendation');
const {
  profileSeed,
  aboutSeed,
  experienceSeed,
  companyProjectsSeed,
  personalProjectsSeed,
  skillsSeed,
  certificationsSeed,
  hackathonsSeed,
  recommendationsSeed,
} = require('./data');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  await Profile.findByIdAndUpdate('singleton', profileSeed, { upsert: true });
  console.log('Seeded: Profile');

  await About.findByIdAndUpdate('singleton', aboutSeed, { upsert: true });
  console.log('Seeded: About');

  /* Experiences go in first: every company project carries the _id of the
     mission it belongs to, so /api/experience/:slug can return both together. */
  await Experience.deleteMany({});
  const experiences = await Experience.insertMany(experienceSeed);
  const expId = Object.fromEntries(experiences.map(e => [e.company, e._id]));
  console.log('Seeded: Experience  (' + experiences.length + ')');

  await Project.deleteMany({});
  const company  = companyProjectsSeed(expId);
  const projects = await Project.insertMany([...company, ...personalProjectsSeed]);
  console.log(
    'Seeded: Projects    (' + company.length + ' company scaffolds, ' +
    personalProjectsSeed.length + ' personal)'
  );
  const drafts = projects.filter(p => p.draft).length;
  if (drafts) console.log('  ↳ ' + drafts + ' company projects are DRAFTS — fill them in at /admin');

  await Skill.findByIdAndUpdate('singleton', skillsSeed, { upsert: true });
  console.log('Seeded: Skills');

  await Certification.deleteMany({});
  await Certification.insertMany(certificationsSeed);
  console.log('Seeded: Certifications');

  await Hackathon.deleteMany({});
  await Hackathon.insertMany(hackathonsSeed);
  console.log('Seeded: Hackathons');

  await Recommendation.deleteMany({});
  await Recommendation.insertMany(recommendationsSeed);
  console.log('Seeded: Recommendations');

  await mongoose.disconnect();
  console.log('Done.');
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
