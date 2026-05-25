import React from 'react';
import PerformanceMetrics from '../components/PerformanceMetrics';
import { useFetch } from '../hooks/useFetch';

export default function About() {
  const { data: about } = useFetch('/api/about');

  const chips   = about?.statusChips   || [];
  const bio     = about?.bio           || [];
  const hobbies = about?.hobbies       || [];
  const edu     = about?.education     || {};
  const extras  = about?.extracurriculars || [];

  return (
    <section id="about" className="space-section">
      <p className="section-label">Who I Am</p>
      <h2 className="section-heading">Crew Profile</h2>
      <div className="section-divider" />

      <div className="about-status-bar">
        {chips.map(c => (
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
          {bio.map((para, i) => (
            <p key={i} className="about-text" dangerouslySetInnerHTML={{ __html: para }} />
          ))}
          <div className="tag-cloud" style={{ marginTop: '1.2rem' }}>
            {hobbies.map(h => (
              <span key={h} className="space-tag">{h}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-card">
            <p className="card-micro-label">BASE CAMP</p>
            <p className="edu-label">Education</p>
            <p className="edu-school">{edu.school}</p>
            <p className="edu-detail">{edu.degree} · {edu.period}</p>
            <p className="edu-detail" style={{ marginTop: '0.3rem' }}>CGPA {edu.cgpa} · {edu.location}</p>
          </div>

          <div className="glass-card">
            <p className="card-micro-label">CREW ACTIVITIES</p>
            <p className="edu-label">Extra-Curricular</p>
            {extras.map((e, i) => (
              <p key={i} className="about-text" style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#a78bfa' }}>{e.role}</strong> — {e.org}: {e.desc}
              </p>
            ))}
          </div>
        </div>
      </div>

      <PerformanceMetrics />
    </section>
  );
}
