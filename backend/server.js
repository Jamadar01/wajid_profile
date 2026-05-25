require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes        = require('./src/routes/auth');
const profileRoutes     = require('./src/routes/profile');
const aboutRoutes       = require('./src/routes/about');
const experienceRoutes  = require('./src/routes/experience');
const projectRoutes     = require('./src/routes/projects');
const skillRoutes       = require('./src/routes/skills');
const hackathonRoutes   = require('./src/routes/hackathons');
const recommendationRoutes = require('./src/routes/recommendations');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors());
app.use(express.json());

app.use('/api/auth',            authRoutes);
app.use('/api/profile',         profileRoutes);
app.use('/api/about',           aboutRoutes);
app.use('/api/experience',      experienceRoutes);
app.use('/api/projects',        projectRoutes);
app.use('/api/skills',          skillRoutes);
app.use('/api/hackathons',      hackathonRoutes);
app.use('/api/recommendations', recommendationRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
