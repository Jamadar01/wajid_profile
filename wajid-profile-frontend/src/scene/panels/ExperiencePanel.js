import React from 'react';
import PanelBase from '../PanelBase';
import GlitchText from '../../components/GlitchText';
import { experienceData } from '../../data/experinceData';

export default function ExperiencePanel({ angle, radius }) {
  return (
    <PanelBase angle={angle} radius={radius} label="EXPERIENCE.db">
      <h2 className="section-title"><GlitchText>Work Experience</GlitchText></h2>
      <p className="about-line" style={{ marginBottom: '1rem' }}>
        $ query experience --order=desc
      </p>

      {experienceData.map((exp, i) => (
        <div key={i} className="exp-page-card" style={{ marginBottom: '1rem' }}>
          <h3>{exp.role}</h3>
          <p className="exp-meta"><span>CO</span>{exp.company}</p>
          <p className="exp-meta"><span>DT</span>{exp.duration}</p>
          <p className="exp-meta"><span>⌘</span>{exp.techStack.split(',').slice(0, 4).join(' · ')}</p>
          <ul style={{ marginTop: '0.6rem' }}>
            {exp.responsibilities.map((r, j) => (
              <li key={j}>{r}</li>
            ))}
          </ul>
          <a href={exp.link} target="_blank" rel="noreferrer" className="exp-visit-link">
            ./visit ↗
          </a>
        </div>
      ))}
    </PanelBase>
  );
}
