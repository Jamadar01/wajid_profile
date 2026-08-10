require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose       = require('mongoose');
const Profile        = require('../src/models/Profile');
const About          = require('../src/models/About');
const Experience     = require('../src/models/Experience');
const Project        = require('../src/models/Project');
const Skill          = require('../src/models/Skill');
const Hackathon      = require('../src/models/Hackathon');
const Recommendation = require('../src/models/Recommendation');

const profileSeed = {
  _id: 'singleton',
  name: 'Wajid Jamadar',
  greeting: 'Hello, Universe',
  typedStrings: [
    'Full-Stack Developer',
    'AI Enthusiast',
    'Open Source Contributor',
    'Cloud Engineer',
  ],
  description:
    'Building intelligent, real-time web applications with AI, Cloud, and WebSockets. Currently at Wohlig Transformation — passionate about clean code and elegant solutions.',
  resumeLink:
    'https://drive.google.com/file/d/1QHDfvKdBQcL-6MtakP_QCbdcI1RIminJ/view?usp=drive_link',
  profileImage: '/images/profile.JPG',
  social: {
    email:    'wajidjamadar01@gmail.com',
    github:   'https://github.com/Jamadar01',
    linkedin: 'https://www.linkedin.com/in/wajid-jamadar-2b880b20a/',
  },
};

const aboutSeed = {
  _id: 'singleton',
  statusChips: [
    { label: 'STATUS', value: 'ACTIVE',         color: '#34D399' },
    { label: 'BASE',   value: 'Mumbai, IN',     color: '#38BDF8' },
    { label: 'ROLE',   value: 'Software Dev',   color: '#A78BFA' },
    { label: 'FOCUS',  value: 'AI + Full-Stack', color: '#F472B6' },
  ],
  bio: [
    "I'm a Software Developer at Wohlig Transformation, building intelligent real-time web applications powered by AI and Cloud.",
    'My work spans AI chatbots, recommendation systems, WebSocket-driven apps, and performance-optimised APIs — from prototype to production.',
    'Previously interned at 43Appmart and IBM CSRBOX. Beyond code — I love dancing, sketching, reading, and writing.',
  ],
  hobbies: ['Dancing', 'Drawing', 'Reading', 'Writing', 'Creative'],
  education: {
    school:   'Sardar Patel Institute of Technology',
    degree:   'B.Tech Electronics Engineering',
    period:   '2020–2024',
    cgpa:     '7.0',
    location: 'Andheri, Mumbai',
  },
  extracurriculars: [
    {
      role: 'Creative Head',
      org:  'Enactus SPIT',
      desc: 'Led design and video editing for events.',
    },
    {
      role: 'Committee Member',
      org:  'Enactus',
      desc: 'Promoted social campaigns online and offline.',
    },
  ],
};

const experienceSeed = [
  {
    company: 'Wohlig Transformation',
    role: 'Software Developer',
    duration: 'Apr 2024 – Present',
    location: 'Sion, Maharashtra, India',
    techStack: 'NodeJs, ExpressJs, MongoDB, ReactJs, Python, OpenAI, Gemini, Google Cloud Platform, Kubernetes, WebSocket',
    responsibilities: [
      'Integrated OpenAI & Gemini models for chatbot functionality',
      'Built recommendation systems with Google Vertex AI & Pinecone',
      'Used WebSocket for real-time AI-driven app features',
    ],
    link: 'https://www.wohlig.com/',
    image: '/images/exp1.png',
    order: 0,
  },
  {
    company: '43Appmart Technologies',
    role: 'Software Developer Intern',
    duration: 'Mar 2024 – Aug 2024',
    location: 'Andheri, Maharashtra, India',
    techStack: 'PHP, AngularJS, SQL, WAMP, WebSocket',
    responsibilities: [
      'Developed cross-platform UI using AngularJS',
      'Created RESTful APIs with PHP & MySQL',
      'Implemented real-time chat using WebSocket',
    ],
    link: 'https://43appmart.com/',
    image: '/images/exp2.png',
    order: 1,
  },
  {
    company: 'IBM CSRBOX (Academic Internship)',
    role: 'Frontend Web Developer Intern',
    duration: 'Jun 2023 – Jul 2023',
    location: 'Mumbai, Maharashtra, India',
    techStack: 'ReactJs, Bootstrap',
    responsibilities: [
      'Implemented UI components with React and Bootstrap',
      'Collaborated with design teams for consistent branding',
      'Debugged frontend issues to improve UX',
    ],
    link: 'https://www.ibm.com/in-en',
    image: '/images/exp3.png',
    order: 2,
  },
];

const projectsSeed = [
  {
    name: 'AI Chatbot Platform', emoji: '🤖',
    color: '#7C3AED', glow: 'rgba(124,58,237,0.5)', highlight: 'rgba(167,139,250,0.3)',
    ring: true, size: 88,
    tech: ['OpenAI', 'Gemini', 'Node.js', 'WebSocket', 'React'],
    company: 'Wohlig Transformation',
    desc: 'Enterprise-grade AI chatbot with OpenAI & Gemini integration, real-time streaming responses, context-aware conversation management and multi-tenant support.',
    kind: 'company', order: 0,
  },
  {
    name: 'Recommendation Engine', emoji: '🎯',
    color: '#0EA5E9', glow: 'rgba(14,165,233,0.5)', highlight: 'rgba(56,189,248,0.3)',
    ring: false, size: 76,
    tech: ['Vertex AI', 'Pinecone', 'Python', 'GCP'],
    company: 'Wohlig Transformation',
    desc: 'Personalized recommendation system using Google Vertex AI embeddings and Pinecone vector search for millisecond-latency retrieval at scale.',
    kind: 'company', order: 1,
  },
  {
    name: 'Real-Time Sync App', emoji: '⚡',
    color: '#10B981', glow: 'rgba(16,185,129,0.5)', highlight: 'rgba(52,211,153,0.3)',
    ring: false, size: 68,
    tech: ['WebSocket', 'Node.js', 'React', 'MongoDB'],
    company: 'Wohlig Transformation',
    desc: 'Real-time collaborative web application with WebSocket-driven live sync, conflict resolution and performance-optimised API layer.',
    kind: 'company', order: 2,
  },
  {
    name: 'E-Commerce Platform', emoji: '🛒',
    color: '#F59E0B', glow: 'rgba(245,158,11,0.5)', highlight: 'rgba(252,211,77,0.3)',
    ring: true, size: 72,
    tech: ['PHP', 'AngularJS', 'MySQL', 'WebSocket'],
    company: '43Appmart',
    desc: 'Cross-platform e-commerce solution with RESTful APIs, real-time order tracking via WebSocket, and a full admin dashboard.',
    kind: 'company', order: 3,
  },
  {
    name: 'Social Campaign Portal', emoji: '📢',
    color: '#EC4899', glow: 'rgba(236,72,153,0.5)', highlight: 'rgba(244,114,182,0.3)',
    ring: false, size: 60,
    tech: ['React', 'Bootstrap', 'REST API'],
    company: 'IBM CSRBOX',
    desc: 'Social campaign management portal with analytics dashboard, multi-channel publishing, and consistent design system across 15+ UI components.',
    kind: 'company', order: 4,
  },
  {
    name: 'IIT Hackathon App', emoji: '🏆',
    color: '#14B8A6', glow: 'rgba(20,184,166,0.5)', highlight: 'rgba(45,212,191,0.3)',
    ring: false, size: 64,
    tech: ['React', 'Node.js', 'MongoDB'],
    company: 'IIT Hyderabad',
    desc: 'Full-stack web application built end-to-end in a hackathon window. Ranked Top 10 out of 300+ teams at the IIT Hyderabad Web Dev Hackathon.',
    kind: 'company', order: 5,
  },

  /* ── Personal builds ──────────────────────────────────────
     Side projects, own time. Replace the placeholder entries
     below with your real ones — liveUrl / repoUrl show as
     "Live ↗" and "Code ↗" buttons directly on the card.      */
  {
    name: 'Space Portfolio', emoji: '🪐',
    color: '#8B5CF6', glow: 'rgba(139,92,246,0.5)', highlight: 'rgba(196,181,253,0.3)',
    ring: true, size: 78,
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Three.js'],
    desc: 'This site. A space-themed portfolio with a 3D hero scene, animated starfield, and a custom admin dashboard backed by a Node/Express/MongoDB API — every section is editable without a redeploy.',
    repoUrl: 'https://github.com/Jamadar01/wajid_profile',
    kind: 'personal', order: 0,
  },
  {
    name: 'Your Project Name', emoji: '🔭',
    color: '#22D3EE', glow: 'rgba(34,211,238,0.5)', highlight: 'rgba(103,232,249,0.3)',
    ring: false, size: 68,
    tech: ['React', 'Node.js'],
    desc: 'Placeholder — swap in a real side project. Add liveUrl if it is hosted anywhere, and repoUrl for the GitHub link.',
    liveUrl: '', repoUrl: '',
    kind: 'personal', order: 1,
  },
  {
    name: 'Your Project Name', emoji: '🛰',
    color: '#F472B6', glow: 'rgba(244,114,182,0.5)', highlight: 'rgba(249,168,212,0.3)',
    ring: false, size: 64,
    tech: ['Python'],
    desc: 'Placeholder — swap in a real side project, or delete this entry from the admin dashboard.',
    liveUrl: '', repoUrl: '',
    kind: 'personal', order: 2,
  },
];

const skillsSeed = {
  _id: 'singleton',
  groups: [
    { label: 'Languages',  skills: ['JavaScript', 'Python', 'C++', 'Java', 'C'] },
    { label: 'Frontend',   skills: ['React.js', 'AngularJS', 'HTML5', 'CSS3', 'Bootstrap'] },
    { label: 'Backend',    skills: ['Node.js', 'Express.js', 'Django', 'PHP'] },
    { label: 'Databases',  skills: ['MongoDB', 'MySQL', 'Pinecone'] },
    { label: 'AI & Cloud', skills: ['OpenAI', 'Gemini', 'Google Vertex AI', 'GCP', 'Kubernetes'] },
    { label: 'Real-time',  skills: ['WebSockets', 'REST APIs'] },
    { label: 'Tools',      skills: ['GitHub', 'Postman', 'Figma', 'Canva', 'Appsmith'] },
  ],
  constellations: [
    {
      name: 'Languages', color: '#A78BFA',
      stars: [
        { id: 'js',   label: 'JavaScript', x: 14, y: 20, r: 1.1 },
        { id: 'py',   label: 'Python',     x: 23, y: 30, r: 1.0 },
        { id: 'cpp',  label: 'C++',        x: 9,  y: 39, r: 0.9 },
        { id: 'java', label: 'Java',       x: 19, y: 13, r: 0.9 },
        { id: 'c',    label: 'C',          x: 5,  y: 27, r: 0.8 },
      ],
      lines: [['js','py'],['py','cpp'],['cpp','c'],['js','java'],['java','py']],
    },
    {
      name: 'Frontend', color: '#38BDF8',
      stars: [
        { id: 'react',     label: 'React.js',  x: 68, y: 12, r: 1.1 },
        { id: 'angular',   label: 'AngularJS', x: 80, y: 19, r: 0.9 },
        { id: 'html',      label: 'HTML5',     x: 74, y: 28, r: 0.9 },
        { id: 'css3',      label: 'CSS3',      x: 85, y: 24, r: 0.8 },
        { id: 'bootstrap', label: 'Bootstrap', x: 82, y: 36, r: 0.8 },
      ],
      lines: [['react','html'],['html','css3'],['html','angular'],['angular','bootstrap'],['css3','bootstrap']],
    },
    {
      name: 'Backend', color: '#34D399',
      stars: [
        { id: 'node',    label: 'Node.js',    x: 18, y: 58, r: 1.1 },
        { id: 'express', label: 'Express.js', x: 29, y: 66, r: 0.9 },
        { id: 'django',  label: 'Django',     x: 11, y: 73, r: 0.8 },
        { id: 'php',     label: 'PHP',        x: 24, y: 79, r: 0.8 },
      ],
      lines: [['node','express'],['express','django'],['express','php']],
    },
    {
      name: 'Databases', color: '#FCD34D',
      stars: [
        { id: 'mongo',    label: 'MongoDB',  x: 47, y: 50, r: 1.0 },
        { id: 'mysql',    label: 'MySQL',    x: 57, y: 58, r: 0.9 },
        { id: 'pinecone', label: 'Pinecone', x: 43, y: 65, r: 0.8 },
      ],
      lines: [['mongo','mysql'],['mongo','pinecone'],['mysql','pinecone']],
    },
    {
      name: 'AI & Cloud', color: '#F472B6',
      stars: [
        { id: 'openai',  label: 'OpenAI',     x: 72, y: 52, r: 1.1 },
        { id: 'gemini',  label: 'Gemini',     x: 83, y: 60, r: 1.0 },
        { id: 'gcp',     label: 'GCP',        x: 76, y: 70, r: 0.9 },
        { id: 'k8s',     label: 'Kubernetes', x: 65, y: 76, r: 0.8 },
        { id: 'vertex',  label: 'Vertex AI',  x: 91, y: 48, r: 0.8 },
      ],
      lines: [['openai','gemini'],['gemini','gcp'],['gcp','k8s'],['openai','vertex'],['gemini','vertex']],
    },
    {
      name: 'Tools', color: '#60A5FA',
      stars: [
        { id: 'github',  label: 'GitHub',     x: 35, y: 86, r: 0.9 },
        { id: 'postman', label: 'Postman',    x: 46, y: 92, r: 0.8 },
        { id: 'figma',   label: 'Figma',      x: 56, y: 87, r: 0.8 },
        { id: 'ws',      label: 'WebSockets', x: 65, y: 93, r: 0.8 },
      ],
      lines: [['github','postman'],['postman','figma'],['figma','ws']],
    },
  ],
};

const hackathonsSeed = [
  {
    rank: 'Top 10',
    name: 'Web Development Hackathon',
    org: 'IIT Hyderabad · Nov 2023',
    desc: 'Ranked Top 10 out of 300+ competing teams. Built a fully functional, production-ready web application end-to-end within the hackathon window.',
    badges: [{ label: '300 Teams', cls: 'gold' }, { label: 'Full-Stack', cls: 'blue' }],
    color: '#FCD34D', glow: 'rgba(252,211,77,0.4)', emoji: '🏆', orbitDur: '10s',
    order: 0,
  },
  {
    rank: '24 hrs',
    name: 'AI Amplify Hackathon',
    org: 'Finance-1 × Atrina · Sep 2023',
    desc: 'Designed and deployed a fully functional AI model in a 24-hour intensive sprint challenge hosted by Finance-1 and Atrina Technologies.',
    badges: [{ label: '24H Sprint', cls: 'purple' }, { label: 'AI / ML', cls: 'blue' }],
    color: '#A78BFA', glow: 'rgba(167,139,250,0.4)', emoji: '⚡', orbitDur: '13s',
    order: 1,
  },
];

const recommendationsSeed = [
  {
    signal: 'ALPHA-1',
    quote: 'Wajid is a highly resourceful developer who always finds elegant solutions to complex problems.',
    name: 'John Doe', role: 'Tech Lead @ CompanyX', strength: 98, color: '#8B5CF6', order: 0,
  },
  {
    signal: 'BETA-2',
    quote: 'His problem-solving and teamwork skills are absolutely top-notch. A pleasure to work with.',
    name: 'Jane Smith', role: 'Product Manager @ StartupY', strength: 95, color: '#06B6D4', order: 1,
  },
  {
    signal: 'GAMMA-3',
    quote: 'Always delivers high-quality work on time. A genuinely great team player and communicator!',
    name: 'Alex Lee', role: 'Software Engineer @ DevHouse', strength: 97, color: '#EC4899', order: 2,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  await Profile.findByIdAndUpdate('singleton', profileSeed, { upsert: true });
  console.log('Seeded: Profile');

  await About.findByIdAndUpdate('singleton', aboutSeed, { upsert: true });
  console.log('Seeded: About');

  await Experience.deleteMany({});
  await Experience.insertMany(experienceSeed);
  console.log('Seeded: Experience');

  await Project.deleteMany({});
  await Project.insertMany(projectsSeed);
  console.log('Seeded: Projects');

  await Skill.findByIdAndUpdate('singleton', skillsSeed, { upsert: true });
  console.log('Seeded: Skills');

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
