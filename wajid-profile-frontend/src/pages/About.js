import React from 'react';
import PerformanceMetrics from '../components/PerformanceMetrics';

const STATUS_CHIPS = [
  { label: 'STATUS', value: 'ACTIVE',        color: '#34D399' },
  { label: 'BASE',   value: 'Mumbai, IN',    color: '#38BDF8' },
  { label: 'ROLE',   value: 'Software Dev',  color: '#A78BFA' },
  { label: 'FOCUS',  value: 'AI + Full-Stack', color: '#F472B6' },
];

export default function About() {
  return (
    <section id="about" className="space-section">
      <p className="section-label">Who I Am</p>
      <h2 className="section-heading">Crew Profile</h2>
      <div className="section-divider" />

      <div className="about-status-bar">
        {STATUS_CHIPS.map(c => (
          <div key={c.label} className="status-chip" style={{ borderColor: `${c.color}40` }}>
            <span className="status-chip-label">{c.label}</span>
            <span className="status-chip-value" style={{ color: c.color }}>{c.value}</span>
          </div>
        ))}
      </div>

      <div className="about-grid">
        <div className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
          <p className="card-micro-label">CREW BIO</p>
          <div className="about-scan" />
          <p className="about-text">
            I'm a Software Developer at <strong style={{ color: '#a78bfa' }}>Wohlig Transformation</strong>,
            building intelligent real-time web applications powered by AI and Cloud.
          </p>
          <p className="about-text">
            My work spans AI chatbots, recommendation systems, WebSocket-driven apps, and
            performance-optimised APIs — from prototype to production.
          </p>
          <p className="about-text">
            Previously interned at <strong style={{ color: '#38bdf8' }}>43Appmart</strong> and{' '}
            <strong style={{ color: '#38bdf8' }}>IBM CSRBOX</strong>. Beyond code — I love
            dancing, sketching, reading, and writing.
          </p>
          <div className="tag-cloud" style={{ marginTop: '1.2rem' }}>
            {['Dancing', 'Drawing', 'Reading', 'Writing', 'Creative'].map(h => (
              <span key={h} className="space-tag">{h}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-card">
            <p className="card-micro-label">BASE CAMP</p>
            <p className="edu-label">Education</p>
            <p className="edu-school">Sardar Patel Institute of Technology</p>
            <p className="edu-detail">B.Tech Electronics Engineering · 2020–2024</p>
            <p className="edu-detail" style={{ marginTop: '0.3rem' }}>CGPA 7.0 · Andheri, Mumbai</p>
          </div>

          <div className="glass-card">
            <p className="card-micro-label">CREW ACTIVITIES</p>
            <p className="edu-label">Extra-Curricular</p>
            <p className="about-text" style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#a78bfa' }}>Creative Head</strong> — Enactus SPIT: led design and video editing for events.
            </p>
            <p className="about-text">
              <strong style={{ color: '#a78bfa' }}>Committee Member</strong> — Enactus: promoted social campaigns online and offline.
            </p>
          </div>
        </div>
      </div>

      <PerformanceMetrics />
    </section>
  );
}
