import React, { useState } from 'react';
import ArchitectureDiagram from './ArchitectureDiagram';

/* Shared planet grid + detail panel. `variant` decides what sits under the
   planet name: the company tag, or Live / Code links. The homepage uses the
   personal variant; the company variant is still here because mission pages
   and any future company grid share this component. */

function PlanetLinks({ project, color, onCard }) {
  const { liveUrl, repoUrl } = project;
  if (!liveUrl && !repoUrl) return null;

  /* on the card, a link click must not also toggle the detail panel */
  const stop = onCard ? (e) => e.stopPropagation() : undefined;

  return (
    <div className={onCard ? 'planet-card-links' : 'planet-detail-links'}>
      {liveUrl && (
        <a
          className={onCard ? 'planet-card-link planet-card-link-live' : 'btn-primary'}
          href={liveUrl} target="_blank" rel="noreferrer" onClick={stop}
          style={onCard ? { borderColor: `${color}66`, color } : { padding: '8px 20px', fontSize: '0.82rem' }}
        >
          Live ↗
        </a>
      )}
      {repoUrl && (
        <a
          className={onCard ? 'planet-card-link' : 'btn-ghost'}
          href={repoUrl} target="_blank" rel="noreferrer" onClick={stop}
          style={onCard ? undefined : { padding: '7px 18px', fontSize: '0.82rem' }}
        >
          {onCard ? 'Code ↗' : 'View Code ↗'}
        </a>
      )}
    </div>
  );
}

function Planet({ project, selected, onClick, index, variant, label }) {
  const { name, color, glow, highlight, ring, size } = project;

  return (
    <div
      className={`planet-card ${selected ? 'planet-selected' : ''}`}
      onClick={() => onClick(project)}
      title={name}
    >
      <p className="planet-number">{label} {String(index + 1).padStart(2, '0')}</p>

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

      {variant === 'personal'
        ? <p className="planet-company-tag">Side Project</p>
        : <p className="planet-company-tag">{project.company}</p>}

      <div className="planet-chips">
        {(project.tech || []).slice(0, 2).map(t => (
          <span key={t} className="planet-chip" style={{ borderColor: `${color}44`, color }}>
            {t}
          </span>
        ))}
      </div>

      {variant === 'personal' && <PlanetLinks project={project} color={color} onCard />}

      <p className="planet-hint">↗ Click to explore</p>
    </div>
  );
}

export default function PlanetSystem({ projects, variant = 'company', label = 'PROJECT' }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (p) => setSelected(prev => (prev?._id === p._id ? null : p));

  return (
    <>
      <div className="planet-grid">
        {projects.map((p, i) => (
          <Planet
            key={p._id}
            project={p}
            index={i}
            variant={variant}
            label={label}
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
              <p className="planet-detail-company">
                {variant === 'personal' ? 'Personal Project' : selected.company}
              </p>
            </div>
            <button className="planet-close" onClick={() => setSelected(null)}>✕</button>
          </div>
          {selected.draft && (
            <span className="mission-draft-badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              DRAFT
            </span>
          )}

          <p className="planet-detail-desc">{selected.desc}</p>

          {(selected.problem || selected.solution || selected.result) && (
            <div className="case-study">
              {selected.problem && (
                <div className="case-block">
                  <p className="case-label" style={{ color: selected.color }}>The Problem</p>
                  <p className="case-text">{selected.problem}</p>
                </div>
              )}
              {selected.solution && (
                <div className="case-block">
                  <p className="case-label" style={{ color: selected.color }}>What I Built</p>
                  <p className="case-text">{selected.solution}</p>
                </div>
              )}
              {selected.result && (
                <div className="case-block">
                  <p className="case-label" style={{ color: selected.color }}>The Result</p>
                  <p className="case-text">{selected.result}</p>
                </div>
              )}
            </div>
          )}

          {!!(selected.highlights || []).length && (
            <div className="mission-highlights">
              <p className="case-label" style={{ color: selected.color }}>Highlights</p>
              <ul className="exp-points">
                {selected.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
          )}

          <ArchitectureDiagram layers={selected.architecture} color={selected.color} />

          <div className="planet-detail-tech">
            {(selected.tech || []).map(t => (
              <span
                key={t}
                className="planet-chip"
                style={{ borderColor: `${selected.color}55`, color: selected.color, padding: '4px 12px', fontSize: '0.8rem' }}
              >
                {t}
              </span>
            ))}
          </div>

          <PlanetLinks project={selected} color={selected.color} />
        </div>
      )}
    </>
  );
}
