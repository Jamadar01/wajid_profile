// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Hackathons from './pages/Hackathons';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className="container">
        <div className="header">
          <h1>Wajid Jamadar</h1>
          <div className="nav-group">
            <nav className="nav-links">
              <Link to="/experience">Experience</Link>
              <Link to="/skills">Skills</Link>
              <Link to="/hackathons">Hackathons</Link>
            </nav>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/hackathons" element={<Hackathons />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
