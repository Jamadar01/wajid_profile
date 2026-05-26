import React from 'react';
import { useFetch } from '../hooks/useFetch';

const MISSION_STYLES = [
  { color: '#8B5CF6', glow: 'rgba(139,92,246,0.5)', highlight: '#A78BFA', ring: true,  size: 76 },
  { color: '#06B6D4', glow: 'rgba(6,182,212,0.5)',  highlight: '#38BDF8', ring: false, size: 64 },
  { color: '#EC4899', glow: 'rgba(236,72,153,0.5)', highlight: '#F472B6', ring: false, size: 56 },
];

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
  const { data: experiences } = useFetch('/api/experience', []);

  return (
    <section id="experience" className="space-section">
      <p className="section-label">Career</p>
      <h2 className="section-heading">Mission Log</h2>
      <div className="section-divider" />

      <div className="exp-m-list">
        {experiences.map((exp, i) => {
          const ms = MISSION_STYLES[i % MISSION_STYLES.length];
          return (
            <div key={exp._id} className="exp-m-item">
              <a href={exp.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
              <div className="exp-m-card" style={{ borderColor: `${ms.color}22`, cursor: 'pointer' }}>
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
                    {exp.responsibilities.map((r, j) => (
                      <li key={j}>{r}</li>
                    ))}
                  </ul>
                  <span
                    className="exp-link"
                    style={{ color: ms.color, borderBottomColor: `${ms.color}44` }}
                  >
                    Visit Company ↗
                  </span>
                </div>
              </div>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
