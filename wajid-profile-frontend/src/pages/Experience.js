import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import SectionStatus from '../components/SectionStatus';

/* Fallback palette for entries seeded before Experience carried its own
   colour — the mission page reads exp.color, so keep these in step. */
const MISSION_STYLES = [
  { color: '#8B5CF6', glow: 'rgba(139,92,246,0.5)', highlight: '#A78BFA', ring: true,  size: 76 },
  { color: '#06B6D4', glow: 'rgba(6,182,212,0.5)',  highlight: '#38BDF8', ring: false, size: 64 },
  { color: '#EC4899', glow: 'rgba(236,72,153,0.5)', highlight: '#F472B6', ring: false, size: 56 },
];

/* Slug is preferred for a readable URL; the _id always resolves, so old
   docs without a slug still open. */
const missionPath = (exp) => `/mission/${exp.slug || exp._id}`;

function MissionPlanet({ ms, index }) {
  const { color, glow, highlight, ring, size } = ms;
  const orbitW = size + 44;
  return (
    <div className="exp-m-visual">
      <div className="exp-m-planet-wrap">
        <div
          className="exp-m-orbit"
          style={{ width: orbitW, height: orbitW, borderColor: `${color}28` }}
        >
          <span className="exp-m-orbit-dot" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
        </div>
        <div
          className="exp-m-planet"
          style={{
            width: size,
            height: size,
            background: `radial-gradient(circle at 30% 30%, ${highlight}55 0%, ${color} 50%, #000 115%)`,
            boxShadow: `inset -${Math.round(size * 0.15)}px -${Math.round(size * 0.1)}px ${Math.round(size * 0.25)}px rgba(0,0,0,0.7),
                        0 0 ${Math.round(size * 0.5)}px ${glow},
                        0 0 ${size}px ${color}22`,
          }}
        >
          {ring && <div className="exp-m-ring" style={{ borderColor: `${color}55` }} />}
        </div>
      </div>
      <div className="exp-m-badge" style={{ color, borderColor: `${color}44`, background: `${color}12` }}>
        MISSION {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  );
}

export default function Experience() {
  const { data: experiences, loading, error } = useFetch('/api/experience', []);

  return (
    <section id="experience" className="space-section">
      <p className="section-label">Career</p>
      <h2 className="section-heading">Mission Log</h2>
      <div className="section-divider" />
      <p className="about-text" style={{ marginBottom: '2rem', maxWidth: 580 }}>
        Every role is a mission. Open one to read the full log — the projects shipped there,
        the skills deployed, and how each system was put together.
      </p>
      <SectionStatus loading={loading} error={error} empty={!experiences.length} />

      <div className="exp-m-list">
        {experiences.map((exp, i) => {
          const fallback = MISSION_STYLES[i % MISSION_STYLES.length];
          const ms       = { ...fallback, color: exp.color || fallback.color };
          const path     = missionPath(exp);

          return (
            <div key={exp._id} className="exp-m-item">
              <div className="exp-m-card" style={{ borderColor: `${ms.color}22` }}>
                {/* Stretched link — the whole card is clickable without
                    nesting the company link inside another anchor. */}
                <Link
                  to={path}
                  className="exp-m-stretch"
                  aria-label={`Open mission log for ${exp.company}`}
                />

                <MissionPlanet ms={ms} index={i} />

                <div className="exp-m-body">
                  <div className="exp-card-header">
                    <img src={exp.image} alt={exp.company} className="exp-logo" />
                    <div>
                      <p className="exp-role">{exp.role}</p>
                      <p className="exp-company" style={{ color: ms.color }}>{exp.company}</p>
                      <p className="exp-duration">{exp.duration} · {exp.location}</p>
                    </div>
                  </div>

                  <p className="exp-stack">{exp.techStack}</p>

                  <ul className="exp-points">
                    {(exp.responsibilities || []).map((r, j) => (
                      <li key={j}>{r}</li>
                    ))}
                  </ul>

                  <div className="exp-m-actions">
                    <Link
                      to={path}
                      className="exp-link exp-m-primary"
                      style={{ color: ms.color, borderBottomColor: `${ms.color}66` }}
                    >
                      Open Full Mission Log →
                    </Link>
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noreferrer"
                        className="exp-link exp-m-secondary"
                      >
                        Visit Company ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
