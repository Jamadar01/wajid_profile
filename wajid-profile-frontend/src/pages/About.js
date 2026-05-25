import React from 'react';
import PerformanceMetrics from '../components/PerformanceMetrics';

export default function About() {
  return (
    <section id="about" className="space-section">
      <p className="section-label">Who I Am</p>
      <h2 className="section-heading">About Me</h2>
      <div className="section-divider" />

      <div className="about-grid">
        <div className="glass-card">
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
            <p className="edu-label">Education</p>
            <p className="edu-school">Sardar Patel Institute of Technology</p>
            <p className="edu-detail">B.Tech Electronics Engineering · 2020–2024</p>
            <p className="edu-detail" style={{ marginTop: '0.3rem' }}>CGPA 7.0 · Andheri, Mumbai</p>
          </div>

          <div className="glass-card">
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
