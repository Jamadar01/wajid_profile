import React, { useState } from 'react';
import { useFetch } from '../hooks/useFetch';

function Planet({ project, selected, onClick, index }) {
  const { name, color, glow, highlight, ring, size } = project;

  return (
    <div
      className={`planet-card ${selected ? 'planet-selected' : ''}`}
      onClick={() => onClick(project)}
      title={name}
    >
      <p className="planet-number">PROJECT {String(index + 1).padStart(2, '0')}</p>

      <div className="planet-scene">
        <div className="planet-halo" style={{ boxShadow: `0 0 40px 10px ${glow}` }} />
        <div
          className="planet-sphere"
          style={{
            width: size,
            height: size,
            background: `radial-gradient(circle at 32% 32%, ${highlight} 0%, ${color} 45%, #000 110%)`,
            boxShadow: `inset -${size * 0.15}px -${size * 0.1}px ${size * 0.25}px rgba(0,0,0,0.6),
                        inset ${size * 0.05}px ${size * 0.05}px ${size * 0.12}px rgba(255,255,255,0.12),
                        0 0 ${size * 0.5}px ${glow},
                        0 0 ${size}px ${color}22`,
          }}
        >
          {ring && (
            <div
              className="planet-ring"
              style={{ borderColor: `${color}55`, boxShadow: `0 0 12px ${glow}` }}
            />
          )}
        </div>
      </div>

      <p className="planet-name">{name}</p>
      <p className="planet-company-tag">{project.company}</p>

      <div className="planet-chips">
        {project.tech.slice(0, 2).map(t => (
          <span key={t} className="planet-chip" style={{ borderColor: `${color}44`, color }}>
            {t}
          </span>
        ))}
      </div>

      <p className="planet-hint">↗ Click to explore</p>
    </div>
  );
}

export default function Projects() {
  const { data: projects } = useFetch('/api/projects', []);
  const [selected, setSelected] = useState(null);

  const handleSelect = (p) => setSelected(prev => prev?._id === p._id ? null : p);

  return (
    <section id="projects" className="space-section">
      <p className="section-label">Projects</p>
      <h2 className="section-heading">My Planet System</h2>
      <div className="section-divider" />
      <p className="about-text" style={{ marginBottom: '2rem', maxWidth: 580 }}>
        Each planet represents a real project I built. Click any planet to reveal its full story — tech stack, description, and company.
      </p>

      <div className="planet-grid">
        {projects.map((p, i) => (
          <Planet
            key={p._id}
            project={p}
            index={i}
            selected={selected?._id === p._id}
            onClick={handleSelect}
          />
        ))}
      </div>

      {selected && (
        <div
          className="planet-detail"
          style={{ borderColor: `${selected.color}44`, boxShadow: `0 0 40px ${selected.glow}` }}
        >
          <div className="planet-detail-header">
            <span className="planet-detail-emoji">{selected.emoji}</span>
            <div>
              <h3 className="planet-detail-name" style={{ color: selected.color }}>
                {selected.name}
              </h3>
              <p className="planet-detail-company">{selected.company}</p>
            </div>
            <button className="planet-close" onClick={() => setSelected(null)}>✕</button>
          </div>
          <p className="planet-detail-desc">{selected.desc}</p>
          <div className="planet-detail-tech">
            {selected.tech.map(t => (
              <span
                key={t}
                className="planet-chip"
                style={{ borderColor: `${selected.color}55`, color: selected.color, padding: '4px 12px', fontSize: '0.8rem' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
