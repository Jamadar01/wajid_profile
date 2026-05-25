import React from 'react';
import { useFetch } from '../hooks/useFetch';

export default function Skills() {
  const { data } = useFetch('/api/skills');
  const skillGroups = data?.groups || [];

  return (
    <section id="skills" className="space-section">
      <p className="section-label">Capabilities</p>
      <h2 className="section-heading">Skills</h2>
      <div className="section-divider" />

      <div className="glass-card">
        {skillGroups.map(({ label, skills }) => (
          <div key={label}>
            <p className="skill-category-title">{label}</p>
            <div className="skill-chips">
              {skills.map(s => (
                <span key={s} className="skill-chip">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
