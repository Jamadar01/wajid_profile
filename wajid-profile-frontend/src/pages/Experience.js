import React from 'react';
import { experienceData } from '../data/experinceData';

const GALAXY_COLORS = ['#8B5CF6', '#06B6D4', '#EC4899'];

function GalaxyOrb({ color }) {
  return (
    <svg className="exp-galaxy" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id={`ng-${color.slice(1)}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={color} stopOpacity="0.35" />
          <stop offset="60%"  stopColor={color} stopOpacity="0.08" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="38" fill={`url(#ng-${color.slice(1)})`} />
      <ellipse cx="40" cy="40" rx="36" ry="10" fill="none" stroke={color} strokeWidth="0.6" strokeOpacity="0.3" transform="rotate(-30 40 40)" />
      <ellipse cx="40" cy="40" rx="26" ry="7"  fill="none" stroke={color} strokeWidth="0.6" strokeOpacity="0.25" transform="rotate(20 40 40)" />
      <ellipse cx="40" cy="40" rx="16" ry="5"  fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.2" transform="rotate(-55 40 40)" />
      <circle cx="40" cy="40" r="3" fill={color} fillOpacity="0.6" />
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const dist = 14 + (i % 3) * 7;
        return (
          <circle
            key={deg}
            cx={40 + Math.cos(rad) * dist}
            cy={40 + Math.sin(rad) * dist}
            r={0.8 + (i % 2) * 0.5}
            fill={color}
            fillOpacity={0.5 - i * 0.04}
          />
        );
      })}
    </svg>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="space-section">
      <p className="section-label">Career</p>
      <h2 className="section-heading">Mission Log</h2>
      <div className="section-divider" />

      <div className="exp-timeline">
        {experienceData.map((exp, i) => (
          <div key={i} className="exp-item">
            <div className="glass-card exp-galaxy-card">
              <GalaxyOrb color={GALAXY_COLORS[i % GALAXY_COLORS.length]} />
              <div className="exp-card-header">
                <img src={exp.image} alt={exp.company} className="exp-logo" />
                <div>
                  <p className="exp-role">{exp.role}</p>
                  <p className="exp-company">{exp.company}</p>
                  <p className="exp-duration">{exp.duration} · {exp.location}</p>
                </div>
              </div>
              <p className="exp-stack">{exp.techStack}</p>
              <ul className="exp-points">
                {exp.responsibilities.map((r, j) => (
                  <li key={j}>{r}</li>
                ))}
              </ul>
              <a href={exp.link} target="_blank" rel="noreferrer" className="exp-link">
                Visit Company ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
