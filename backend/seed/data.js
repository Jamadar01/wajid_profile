/* Seed content, kept separate from the runner so both seed/index.js
   (full reseed) and seed/migrate-projects.js (targeted update) read
   the same source of truth. No database access in here. */

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

  /* Drives the open-to-work banner. `roles`, `types`, `locations` and
     `startDate` are a starting point derived from the AI/Data direction —
     edit them at /admin -> Profile so they match what you actually want.
     Set open: false to hide the banner entirely. */
  availability: {
    open:        true,
    status:      'Open to AI & Data roles',
    closedLabel: 'Not currently looking',
    headline:    'Open to AI and Data Engineering roles',
    blurb:
      'I build production AI systems — LLM integrations, retrieval and recommendation pipelines, and the real-time APIs around them. Looking for a team where that work is the core of the product, not a side experiment.',
    roles: [
      'AI / LLM Engineer',
      'Data Engineer',
      'Machine Learning Engineer',
      'Full-Stack Engineer (AI products)',
    ],
    types:     ['Full-time'],
    locations: ['Mumbai', 'Remote', 'Hybrid'],
    startDate: '',
    ctaLabel:  'Get in touch',
    ctaUrl:    '#contact',
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
    slug: 'wohlig-transformation',
    role: 'Software Developer',
    duration: 'Apr 2024 – Present',
    location: 'Sion, Maharashtra, India',
    techStack: 'NodeJs, ExpressJs, MongoDB, ReactJs, Python, OpenAI, Gemini, Google Cloud Platform, Kubernetes, WebSocket',
    responsibilities: [
      'Integrated OpenAI & Gemini models for chatbot functionality',
      'Built recommendation systems with Google Vertex AI & Pinecone',
      'Used WebSocket for real-time AI-driven app features',
    ],
    summary:
      'Current role. Building intelligent, real-time web applications — conversational AI on OpenAI and Gemini, semantic recommendation on Vertex AI and Pinecone, and WebSocket-driven live features — across a Node, Python and Google Cloud stack.',
    skillGroups: [
      { label: 'Frontend',  items: ['React.js'] },
      { label: 'Backend',   items: ['Node.js', 'Express.js', 'Python'] },
      { label: 'AI',        items: ['OpenAI', 'Gemini', 'Google Vertex AI', 'Pinecone'] },
      { label: 'Data',      items: ['MongoDB', 'Pinecone'] },
      { label: 'Cloud',     items: ['Google Cloud Platform', 'Kubernetes'] },
      { label: 'Real-time', items: ['WebSocket'] },
    ],
    impact: [],
    color: '#8B5CF6',
    link: 'https://www.wohlig.com/',
    image: '/images/exp1.png',
    order: 0,
  },
  {
    company: '43Appmart Technologies',
    slug: '43appmart-technologies',
    role: 'Software Developer Intern',
    duration: 'Mar 2024 – Aug 2024',
    location: 'Andheri, Maharashtra, India',
    techStack: 'PHP, AngularJS, SQL, WAMP, WebSocket',
    responsibilities: [
      'Developed cross-platform UI using AngularJS',
      'Created RESTful APIs with PHP & MySQL',
      'Implemented real-time chat using WebSocket',
    ],
    summary:
      'Full-stack internship on a LAMP-era stack: an AngularJS front end talking to hand-rolled PHP REST APIs over MySQL, with a WebSocket layer added for live chat.',
    skillGroups: [
      { label: 'Frontend',  items: ['AngularJS', 'HTML5', 'CSS3'] },
      { label: 'Backend',   items: ['PHP', 'REST APIs'] },
      { label: 'Data',      items: ['MySQL', 'SQL'] },
      { label: 'Real-time', items: ['WebSocket'] },
      { label: 'Tooling',   items: ['WAMP'] },
    ],
    impact: [],
    color: '#06B6D4',
    link: 'https://43appmart.com/',
    image: '/images/exp2.png',
    order: 1,
  },
  {
    company: 'IBM CSRBOX (Academic Internship)',
    slug: 'ibm-csrbox',
    role: 'Frontend Web Developer Intern',
    duration: 'Jun 2023 – Jul 2023',
    location: 'Mumbai, Maharashtra, India',
    techStack: 'ReactJs, Bootstrap',
    responsibilities: [
      'Implemented UI components with React and Bootstrap',
      'Collaborated with design teams for consistent branding',
      'Debugged frontend issues to improve UX',
    ],
    summary:
      'First structured frontend role — building React components against designer handoffs and keeping branding consistent across the interface.',
    skillGroups: [
      { label: 'Frontend',      items: ['React.js', 'Bootstrap', 'HTML5', 'CSS3'] },
      { label: 'Collaboration', items: ['Design handoff', 'UI debugging'] },
    ],
    impact: [],
    color: '#EC4899',
    link: 'https://www.ibm.com/in-en',
    image: '/images/exp3.png',
    order: 2,
  },
];

/* ── Company work ─────────────────────────────────────────────
   These are SCAFFOLDS, not finished case studies. Each `desc` is
   lifted verbatim from the responsibilities already recorded for
   that role, and each architecture layer lists only tech that is
   already in that role's stack — nothing about scope, numbers or
   outcome has been guessed. `draft: true` makes the UI label the
   card and hide the empty case-study block, so open the admin
   dashboard and fill in Problem / What I Built / Result / notes
   per project, then flip the draft flag off.                    */
const companyProjectsSeed = (expId) => [
  /* Wohlig Transformation */
  {
    name: 'Conversational AI Platform', emoji: '🤖',
    color: '#7C3AED', glow: 'rgba(124,58,237,0.5)', highlight: 'rgba(167,139,250,0.3)',
    ring: true, size: 88,
    tech: ['OpenAI', 'Gemini', 'Node.js', 'Express.js', 'React', 'MongoDB'],
    company: 'Wohlig Transformation', experience: expId['Wohlig Transformation'],
    role: 'Software Developer',
    timeline: 'Apr 2024 – Present',
    desc: 'Integrated OpenAI & Gemini models for chatbot functionality.',
    architecture: [
      { layer: 'Client',    tech: ['React'], note: '' },
      { layer: 'API',       tech: ['Node.js', 'Express.js'], note: '' },
      { layer: 'AI Layer',  tech: ['OpenAI', 'Gemini'], note: '' },
      { layer: 'Data',      tech: ['MongoDB'], note: '' },
    ],
    highlights: [],
    draft: true, kind: 'company', order: 0,
  },
  {
    name: 'Recommendation Engine', emoji: '🎯',
    color: '#0EA5E9', glow: 'rgba(14,165,233,0.5)', highlight: 'rgba(56,189,248,0.3)',
    ring: false, size: 76,
    tech: ['Google Vertex AI', 'Pinecone', 'Python', 'Google Cloud Platform'],
    company: 'Wohlig Transformation', experience: expId['Wohlig Transformation'],
    role: 'Software Developer',
    timeline: 'Apr 2024 – Present',
    desc: 'Built recommendation systems with Google Vertex AI & Pinecone.',
    architecture: [
      { layer: 'Service',    tech: ['Python'], note: '' },
      { layer: 'Embeddings', tech: ['Google Vertex AI'], note: '' },
      { layer: 'Vector Store', tech: ['Pinecone'], note: '' },
      { layer: 'Platform',   tech: ['Google Cloud Platform'], note: '' },
    ],
    highlights: [],
    draft: true, kind: 'company', order: 1,
  },
  {
    name: 'Real-Time AI Features', emoji: '⚡',
    color: '#10B981', glow: 'rgba(16,185,129,0.5)', highlight: 'rgba(52,211,153,0.3)',
    ring: false, size: 68,
    tech: ['WebSocket', 'Node.js', 'React', 'MongoDB', 'Kubernetes'],
    company: 'Wohlig Transformation', experience: expId['Wohlig Transformation'],
    role: 'Software Developer',
    timeline: 'Apr 2024 – Present',
    desc: 'Used WebSocket for real-time AI-driven app features.',
    architecture: [
      { layer: 'Client',    tech: ['React'], note: '' },
      { layer: 'Transport', tech: ['WebSocket'], note: '' },
      { layer: 'Server',    tech: ['Node.js'], note: '' },
      { layer: 'Data',      tech: ['MongoDB'], note: '' },
      { layer: 'Runtime',   tech: ['Kubernetes'], note: '' },
    ],
    highlights: [],
    draft: true, kind: 'company', order: 2,
  },

  /* 43Appmart Technologies */
  {
    name: 'Cross-Platform Commerce UI', emoji: '🛒',
    color: '#F59E0B', glow: 'rgba(245,158,11,0.5)', highlight: 'rgba(252,211,77,0.3)',
    ring: true, size: 72,
    tech: ['AngularJS', 'PHP', 'MySQL', 'REST APIs'],
    company: '43Appmart Technologies', experience: expId['43Appmart Technologies'],
    role: 'Software Developer Intern',
    timeline: 'Mar 2024 – Aug 2024',
    desc: 'Developed cross-platform UI using AngularJS, backed by RESTful APIs written in PHP over MySQL.',
    architecture: [
      { layer: 'Client', tech: ['AngularJS'], note: '' },
      { layer: 'API',    tech: ['PHP', 'REST APIs'], note: '' },
      { layer: 'Data',   tech: ['MySQL'], note: '' },
    ],
    highlights: [],
    draft: true, kind: 'company', order: 3,
  },
  {
    name: 'Real-Time Chat', emoji: '💬',
    color: '#22D3EE', glow: 'rgba(34,211,238,0.5)', highlight: 'rgba(103,232,249,0.3)',
    ring: false, size: 62,
    tech: ['WebSocket', 'PHP', 'AngularJS'],
    company: '43Appmart Technologies', experience: expId['43Appmart Technologies'],
    role: 'Software Developer Intern',
    timeline: 'Mar 2024 – Aug 2024',
    desc: 'Implemented real-time chat using WebSocket.',
    architecture: [
      { layer: 'Client',    tech: ['AngularJS'], note: '' },
      { layer: 'Transport', tech: ['WebSocket'], note: '' },
      { layer: 'Server',    tech: ['PHP'], note: '' },
    ],
    highlights: [],
    draft: true, kind: 'company', order: 4,
  },

  /* IBM CSRBOX */
  {
    name: 'UI Component Work', emoji: '🧩',
    color: '#EC4899', glow: 'rgba(236,72,153,0.5)', highlight: 'rgba(244,114,182,0.3)',
    ring: false, size: 60,
    tech: ['React', 'Bootstrap', 'HTML5', 'CSS3'],
    company: 'IBM CSRBOX (Academic Internship)', experience: expId['IBM CSRBOX (Academic Internship)'],
    role: 'Frontend Web Developer Intern',
    timeline: 'Jun 2023 – Jul 2023',
    desc: 'Implemented UI components with React and Bootstrap, worked from design handoffs to keep branding consistent, and debugged frontend issues to improve UX.',
    architecture: [
      { layer: 'Components', tech: ['React'], note: '' },
      { layer: 'Styling',    tech: ['Bootstrap', 'CSS3'], note: '' },
    ],
    highlights: [],
    draft: true, kind: 'company', order: 5,
  },
];

/* ── Personal builds ─────────────────────────────────────────
   Real repos from github.com/Jamadar01. Descriptions and
   architecture layers were read off each repo's README, its
   package.json / requirements.txt, and its source tree — so
   they describe what is actually in the code. Live links are
   the repo's own homepage field where one is set.             */
const personalProjectsSeed = [
  {
    name: 'Waira', emoji: '🛰',
    color: '#22D3EE', glow: 'rgba(34,211,238,0.5)', highlight: 'rgba(103,232,249,0.3)',
    ring: true, size: 82,
    tech: ['React', 'Vite', 'FastAPI', 'Python', 'LLM Agent'],
    desc: 'An agent that answers questions about me. Visitors ask anything — background, skills, availability, scheduling — and a single agent endpoint answers it, so nothing about me is duplicated into the frontend.',
    problem: 'A static portfolio answers only the questions you thought to write copy for. Anything a visitor actually wants to know goes unanswered.',
    solution: 'A React + Vite chat client posting every message to one POST /api/agent route on a FastAPI backend, where an LLM agent with tools composes the reply as markdown. The frontend holds no facts about me at all — it renders whatever the agent returns.',
    architecture: [
      { layer: 'Client',    tech: ['React', 'Vite'], note: 'Chat UI; the dev server proxies /api so requests stay same-origin' },
      { layer: 'Transport', tech: ['REST'], note: 'One route — POST /api/agent — carrying a question and returning markdown' },
      { layer: 'Agent',     tech: ['FastAPI', 'Python'], note: 'Tool-calling agent; every fact about me is resolved here, not in the client' },
    ],
    highlights: [
      'Single-endpoint design — no separate profile API to keep in sync',
      'Markdown responses render bold, lists and code fences',
      'Vite proxy keeps development same-origin',
    ],
    liveUrl: 'https://waira-ui.vercel.app',
    repoUrl: 'https://github.com/Jamadar01/waira-ui',
    kind: 'personal', order: 0,
  },
  {
    name: 'Sara — Read-Only Assistant', emoji: '📬',
    color: '#8B5CF6', glow: 'rgba(139,92,246,0.5)', highlight: 'rgba(196,181,253,0.3)',
    ring: true, size: 86,
    tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'MCP', 'SSE', 'Docker'],
    desc: 'An assistant over Gmail, Google Calendar and the weather. Ask what is waiting on a reply, what the week looks like, or whether it will rain — it answers by calling tools, never from memory.',
    problem: 'An assistant with mailbox access is one prompt injection away from sending mail as you. Email bodies are untrusted input, and a system prompt is not a permission system.',
    solution: 'The Gmail and Calendar MCP servers expose send, edit and delete tools — those are filtered out of the tool list in build_agent() before the model ever sees them. The prompt says read-only too, but the filter is what enforces it. The agent literally cannot write.',
    result: 'A single-user assistant that is safe to point at a real mailbox: the write path does not exist at the tool layer.',
    architecture: [
      { layer: 'Web',    tech: ['React', 'TypeScript', 'Vite'], note: 'Reads an SSE stream and renders tokens as they arrive' },
      { layer: 'Server', tech: ['FastAPI', 'SSE'], note: 'One turn per POST /api/chat, streamed back; knows nothing about prompts' },
      { layer: 'Agent',  tech: ['Python'], note: 'Model, tool list and system prompt; the whole loop runs inside one astream call' },
      { layer: 'Tools',  tech: ['MCP', 'Gmail', 'Google Calendar', 'Weather'], note: 'Write tools filtered out before the model sees the list' },
    ],
    highlights: [
      'Read-only enforced at the tool layer, not by prompt',
      'Token-by-token SSE streaming to the browser',
      'The agent module knows nothing about HTTP; the server knows nothing about prompts',
      'Dockerfile for the service; OAuth stays on the host',
    ],
    repoUrl: 'https://github.com/Jamadar01/Personal_assistant',
    kind: 'personal', order: 1,
  },
  {
    name: 'JobGenie', emoji: '🧞',
    color: '#F59E0B', glow: 'rgba(245,158,11,0.5)', highlight: 'rgba(252,211,77,0.3)',
    ring: false, size: 80,
    tech: ['FastAPI', 'Python', 'OpenAI', 'Pinecone', 'MongoDB', 'Apify', 'Streamlit', 'APScheduler'],
    desc: 'An AI job recommendation system that scrapes listings, reads your resume, and ranks the most relevant positions by semantic search rather than keyword match.',
    problem: 'Job boards match on keywords, so a resume and a well-suited posting that use different vocabulary never meet.',
    solution: 'A five-stage pipeline: scrape Indeed via Apify into MongoDB, embed every description with OpenAI text-embedding-3-large into a 3072-dimension cosine Pinecone index, parse the resume PDF with pdfplumber, summarise it with GPT-4o-mini, then semantic-search the index using that summary. APScheduler clears stale data and re-runs the whole thing every Monday at 00:01 IST.',
    architecture: [
      { layer: 'UI',           tech: ['Streamlit'], note: 'Chat interface over the recommendation API' },
      { layer: 'API',          tech: ['FastAPI'], note: 'Routes stay thin; services own scraping, resume, storage and vectors' },
      { layer: 'Ingestion',    tech: ['Apify'], note: 'The indeed-scraper actor pulls listings on a schedule' },
      { layer: 'Intelligence', tech: ['OpenAI GPT-4o-mini', 'pdfplumber'], note: 'Resume parsing and a skills/experience summary' },
      { layer: 'Vector Store', tech: ['Pinecone'], note: 'text-embedding-3-large, cosine, 3072 dimensions' },
      { layer: 'Storage',      tech: ['MongoDB'], note: 'Raw listings via pymongo' },
      { layer: 'Scheduler',    tech: ['APScheduler'], note: 'Clears MongoDB and Pinecone, re-scrapes, then rebuilds the index' },
    ],
    highlights: [
      'Semantic matching instead of keyword search',
      'Fully automated weekly refresh — no manual trigger',
      'Every pipeline stage has its own endpoint, so any step can be re-run alone',
      'Layered services: scraping, resume, storage and vectors stay separable',
    ],
    repoUrl: 'https://github.com/Jamadar01/JobGenie',
    kind: 'personal', order: 2,
  },
  {
    name: 'Portify', emoji: '💼',
    color: '#EC4899', glow: 'rgba(236,72,153,0.5)', highlight: 'rgba(249,168,212,0.3)',
    ring: false, size: 76,
    tech: ['React 19', 'Tailwind CSS', 'Zustand', 'Express 5', 'MongoDB', 'JWT', 'Groq'],
    desc: 'A full-stack portfolio builder, split into a Vite/React 19 client and an Express 5 API. Handles auth, resume upload and parsing, LLM assistance and transactional mail.',
    solution: 'Two deployable halves in one repo. The UI is React 19 and Tailwind 4 with Zustand for state and React Router for pages; the API is Express 5 over Mongoose with JWT and bcrypt auth, multer and pdf-parse for resume ingestion, Groq for generation, and nodemailer for outbound mail.',
    architecture: [
      { layer: 'Client', tech: ['React 19', 'Vite', 'Tailwind CSS', 'Zustand'], note: 'Routing, state and styling' },
      { layer: 'API',    tech: ['Express 5'], note: 'Controllers, routes, middleware and models' },
      { layer: 'Auth',   tech: ['JWT', 'bcryptjs'], note: 'Token auth guarding the write routes' },
      { layer: 'Ingest', tech: ['multer', 'pdf-parse'], note: 'Resume upload and text extraction' },
      { layer: 'AI',     tech: ['Groq SDK'], note: 'Generation for portfolio content' },
      { layer: 'Data',   tech: ['MongoDB', 'Mongoose'], note: 'Persistence layer' },
      { layer: 'Mail',   tech: ['nodemailer'], note: 'Transactional email' },
    ],
    highlights: [
      'Monorepo with an independently deployable UI and API',
      'Resume PDF to structured content pipeline',
      'JWT-guarded write routes, bcrypt-hashed credentials',
    ],
    liveUrl: 'https://portify-tau.vercel.app',
    repoUrl: 'https://github.com/Jamadar01/Portify',
    kind: 'personal', order: 3,
  },
  {
    name: 'Inventory Management System', emoji: '📦',
    color: '#10B981', glow: 'rgba(16,185,129,0.5)', highlight: 'rgba(52,211,153,0.3)',
    ring: true, size: 74,
    tech: ['React 18', 'Vite', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Railway', 'Vercel'],
    desc: 'A two-repo inventory system: a React SPA for CRUD and analytics, and a FastAPI service over PostgreSQL that also generates a QR code per product. Both halves are deployed and live.',
    solution: 'The frontend is React 18 and Vite talking to the API over Axios, with a responsive product table, an analytics dashboard and per-product QR codes. The backend is FastAPI with SQLAlchemy 2.0 and Pydantic 2, running Postgres on Neon in production and SQLite locally — tables are created from the model metadata, so there is no migration tool to keep in step.',
    architecture: [
      { layer: 'Client',   tech: ['React 18', 'Vite', 'Axios'], note: 'Deployed on Vercel; API base URL comes from an env var' },
      { layer: 'API',      tech: ['FastAPI', 'Pydantic 2'], note: 'Deployed on Railway via Nixpacks; Swagger and ReDoc exposed' },
      { layer: 'ORM',      tech: ['SQLAlchemy 2.0'], note: 'Tables auto-created from model metadata — no Alembic' },
      { layer: 'Database', tech: ['PostgreSQL (Neon)', 'SQLite'], note: 'Serverless Postgres in production, SQLite for local dev' },
      { layer: 'External', tech: ['API Ninjas'], note: 'QR code generation with a free fallback path' },
    ],
    highlights: [
      'Frontend and backend deployed independently and both live',
      'The same codebase runs on SQLite locally and Postgres in production',
      'QR generation degrades to a fallback when no API key is set',
    ],
    liveUrl: 'https://inventory-frontend-io.vercel.app',
    repoUrl: 'https://github.com/Jamadar01/inventory_frontend.io',
    kind: 'personal', order: 4,
  },
  {
    name: 'Driftmail', emoji: '🕊',
    color: '#60A5FA', glow: 'rgba(96,165,250,0.5)', highlight: 'rgba(147,197,253,0.3)',
    ring: false, size: 70,
    tech: ['Three.js', 'Rapier3D', 'simplex-noise', 'Vite', 'JavaScript'],
    desc: 'A 3D browser game built straight on Three.js — no engine. Rigid-body physics come from Rapier, and the world is generated from simplex noise at load time.',
    solution: 'A hand-rolled engine layout: core owns the loop and renderer, world generates terrain from simplex noise, player handles input and the character controller, and game wires them together. Physics runs on the WASM build of Rapier so it works in the browser with no native toolchain.',
    architecture: [
      { layer: 'Renderer', tech: ['Three.js'], note: 'Scene, camera and draw calls' },
      { layer: 'Physics',  tech: ['Rapier3D (WASM)'], note: 'Rigid bodies and collisions, no native build step' },
      { layer: 'World',    tech: ['simplex-noise'], note: 'Procedural terrain generated at load' },
      { layer: 'Core',     tech: ['JavaScript'], note: 'Game loop, player controller and input' },
      { layer: 'Build',    tech: ['Vite'], note: 'Dev server and bundling' },
    ],
    highlights: [
      'No game engine — loop, world and controller are all hand-written',
      'WASM physics that ships to the browser without a native toolchain',
      'Procedural terrain, so there is no authored level data',
    ],
    repoUrl: 'https://github.com/Jamadar01/Driftmail-',
    kind: 'personal', order: 5,
  },
  {
    name: 'Data Analysis Agent', emoji: '📊',
    color: '#A78BFA', glow: 'rgba(167,139,250,0.5)', highlight: 'rgba(216,180,254,0.3)',
    ring: false, size: 66,
    tech: ['Python', 'OpenAI', 'Pandas'],
    desc: 'An agent that answers questions about a CSV by writing pandas code and running it, rather than by reasoning about numbers it cannot see.',
    problem: 'Asked to analyse a spreadsheet, a language model will happily produce plausible statistics it never computed.',
    solution: 'One tool — run_code — executes Python and returns whatever it printed. The model writes pandas against the loaded DataFrame, reads the real stdout back, and iterates until it can answer. Output is captured by redirecting stdout, and a golden set of question/answer pairs is kept in the repo to check the agent against.',
    architecture: [
      { layer: 'Agent',     tech: ['OpenAI tool calling'], note: 'The loop: write code, read the output, decide the next step' },
      { layer: 'Execution', tech: ['Python', 'contextlib'], note: 'run_code executes and captures stdout back into the conversation' },
      { layer: 'Data',      tech: ['Pandas'], note: 'The CSV is loaded into a DataFrame the generated code queries' },
      { layer: 'Eval',      tech: ['Golden set'], note: 'Question/answer pairs to measure whether answers are actually right' },
    ],
    highlights: [
      'Answers are computed, never estimated by the model',
      'A golden set to check accuracy instead of eyeballing it',
    ],
    repoUrl: 'https://github.com/Jamadar01/data_analysis_agent',
    kind: 'personal', order: 6,
  },
  {
    name: 'AI Summary Service', emoji: '📝',
    color: '#FCD34D', glow: 'rgba(252,211,77,0.45)', highlight: 'rgba(254,240,138,0.3)',
    ring: false, size: 62,
    tech: ['Python', 'FastAPI', 'OpenAI'],
    desc: 'A small FastAPI service that summarises a document, extracts structure from it, or answers a question about it — three routes over one document-services layer.',
    solution: 'Three routes — summarize, extract and ask — all delegate to a single document services class, so the prompt work lives in one place and the route handlers stay thin.',
    architecture: [
      { layer: 'API',      tech: ['FastAPI'], note: 'Three routes: summarize, extract and ask' },
      { layer: 'Services', tech: ['Python'], note: 'All prompting and model calls behind one class' },
      { layer: 'Model',    tech: ['OpenAI'], note: 'Summarisation, extraction and question answering' },
    ],
    highlights: ['Route handlers stay thin — prompts live in the service layer'],
    repoUrl: 'https://github.com/Jamadar01/ai-summary',
    kind: 'personal', order: 7,
  },
  {
    name: 'Chat UI', emoji: '💠',
    color: '#F472B6', glow: 'rgba(244,114,182,0.5)', highlight: 'rgba(251,207,232,0.3)',
    ring: false, size: 60,
    tech: ['React', 'Vite', 'CSS'],
    desc: 'A frontend-only chat interface built from scratch — message list, composer and streaming states — with no UI framework and no component library.',
    solution: 'React and Vite, with the work split across components, hooks, styles and a data module so conversation state and presentation stay separate. Styling is hand-written CSS — roughly as much CSS as JavaScript in the repo.',
    architecture: [
      { layer: 'Components', tech: ['React'], note: 'Message list, composer and chat shell' },
      { layer: 'State',      tech: ['React hooks'], note: 'Conversation state kept out of the components' },
      { layer: 'Styling',    tech: ['CSS'], note: 'Hand-written — no framework, no component library' },
      { layer: 'Build',      tech: ['Vite'], note: 'Dev server and bundling' },
    ],
    highlights: ['No component library — every element is hand-built'],
    repoUrl: 'https://github.com/Jamadar01/Chat-UI',
    kind: 'personal', order: 8,
  },
  {
    name: 'Space Portfolio', emoji: '🪐',
    color: '#7C3AED', glow: 'rgba(124,58,237,0.5)', highlight: 'rgba(196,181,253,0.3)',
    ring: true, size: 78,
    tech: ['React 19', 'Three.js', 'Framer Motion', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    desc: 'This site. A space-themed portfolio with a 3D hero scene and animated starfield, backed by a Node/Express/MongoDB API and a custom admin dashboard — every section is editable without a redeploy.',
    problem: 'A hard-coded portfolio means a git commit and a deploy every time a job, project or link changes.',
    solution: 'Every section reads from an API instead of a constants file. A JWT-guarded admin dashboard has one editor per collection — profile, about, experience, projects, skills, hackathons, messages — so a content change is a form submit, not a release.',
    architecture: [
      { layer: 'Client',  tech: ['React 19', 'React Router', 'Three.js', 'Framer Motion'], note: 'Sections fetch their own data through a shared useFetch hook' },
      { layer: 'API',     tech: ['Node.js', 'Express'], note: 'One route module per collection; reads open, writes guarded' },
      { layer: 'Auth',    tech: ['JWT', 'bcrypt'], note: 'Single admin, token sent in the Authorization header' },
      { layer: 'Data',    tech: ['MongoDB', 'Mongoose'], note: 'Seed script for first-run content' },
      { layer: 'Hosting', tech: ['Vercel'], note: 'Static frontend build, API deployed separately' },
    ],
    highlights: [
      'Content is editable live — no redeploy to change a section',
      'One admin editor per collection, all behind JWT',
      'A 3D hero scene and starfield that respect prefers-reduced-motion',
    ],
    liveUrl: 'https://wajid-profile-frontend.vercel.app',
    repoUrl: 'https://github.com/Jamadar01/wajid_profile',
    kind: 'personal', order: 9,
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
        { id: 'py',   label: 'Python',     x: 23, y: 30, r: 1.0, aliases: ['FastAPI'] },
        { id: 'cpp',  label: 'C++',        x: 9,  y: 39, r: 0.9 },
        { id: 'java', label: 'Java',       x: 19, y: 13, r: 0.9 },
        { id: 'c',    label: 'C',          x: 5,  y: 27, r: 0.8 },
      ],
      lines: [['js','py'],['py','cpp'],['cpp','c'],['js','java'],['java','py']],
    },
    {
      name: 'Frontend', color: '#38BDF8',
      stars: [
        { id: 'react',     label: 'React.js',  x: 68, y: 12, r: 1.1, aliases: ['React', 'React 18', 'React 19'] },
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
        { id: 'node',    label: 'Node.js',    x: 18, y: 58, r: 1.1, aliases: ['Express', 'Express 5'] },
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
        { id: 'mysql',    label: 'MySQL',    x: 57, y: 58, r: 0.9, aliases: ['SQL', 'PostgreSQL', 'SQLAlchemy'] },
        { id: 'pinecone', label: 'Pinecone', x: 43, y: 65, r: 0.8 },
      ],
      lines: [['mongo','mysql'],['mongo','pinecone'],['mysql','pinecone']],
    },
    {
      name: 'AI & Cloud', color: '#F472B6',
      stars: [
        { id: 'openai',  label: 'OpenAI',     x: 72, y: 52, r: 1.1, aliases: ['OpenAI GPT-4o-mini', 'LLM Agent'] },
        { id: 'gemini',  label: 'Gemini',     x: 83, y: 60, r: 1.0 },
        { id: 'gcp',     label: 'GCP',        x: 76, y: 70, r: 0.9, aliases: ['Google Cloud Platform'] },
        { id: 'k8s',     label: 'Kubernetes', x: 65, y: 76, r: 0.8 },
        { id: 'vertex',  label: 'Vertex AI',  x: 91, y: 48, r: 0.8, aliases: ['Google Vertex AI'] },
      ],
      lines: [['openai','gemini'],['gemini','gcp'],['gcp','k8s'],['openai','vertex'],['gemini','vertex']],
    },
    {
      name: 'Tools', color: '#60A5FA',
      stars: [
        { id: 'github',  label: 'GitHub',     x: 35, y: 86, r: 0.9 },
        { id: 'postman', label: 'Postman',    x: 46, y: 92, r: 0.8 },
        { id: 'figma',   label: 'Figma',      x: 56, y: 87, r: 0.8 },
        { id: 'ws',      label: 'WebSockets', x: 65, y: 93, r: 0.8, aliases: ['WebSocket'] },
      ],
      lines: [['github','postman'],['postman','figma'],['figma','ws']],
    },
  ],
};

const certificationsSeed = [
  {
    name:   'Professional Data Engineer',
    issuer: 'Google Cloud',
    kind:   'certification',
    /* Dates, credential ID and image all come from the public Open Badges
       assertion behind the Credly badge (issuedOn 2025-12-21, expires
       2027-12-21), so they match the credential exactly. */
    issued:  'Dec 2025',
    expires: 'Dec 2027',
    credentialId: 'eb29f6357d36447dbda553697563dc86',
    verifyUrl:    'https://www.credly.com/badges/b9ab15cd-c222-4580-b740-85d3375d1fb1',
    badgeImage:   'https://images.credly.com/size/340x340/images/2d613ff8-8879-430b-b2d8-925fa29785e8/image.png',
    emoji:  '☁️',
    color:  '#4285F4',
    glow:   'rgba(66,133,244,0.45)',
    skills: [
      'BigQuery', 'Dataflow', 'Pub/Sub', 'Vertex AI',
      'Data modelling', 'Pipeline design', 'ML deployment',
    ],
    desc:
      'Google Cloud’s professional-level certification for designing and operating data processing systems — batch and streaming pipelines, warehousing, and putting machine learning models into production.',
    order: 0,
  },
];

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

module.exports = {
  profileSeed,
  aboutSeed,
  experienceSeed,
  companyProjectsSeed,
  personalProjectsSeed,
  skillsSeed,
  certificationsSeed,
  hackathonsSeed,
  recommendationsSeed,
};
