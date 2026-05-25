import React from 'react';
import PanelBase from '../PanelBase';
import GlitchText from '../../components/GlitchText';
import SkillSphere3D from '../../components/SkillSphere3D';

const skillData = [
  { category: 'Languages',  skills: ['JavaScript', 'Python', 'C++', 'Java'] },
  { category: 'Frontend',   skills: ['React.js', 'AngularJS', 'HTML5', 'CSS3'] },
  { category: 'Backend',    skills: ['Node.js', 'Express.js', 'Django', 'PHP'] },
  { category: 'Databases',  skills: ['MongoDB', 'MySQL', 'Pinecone'] },
  { category: 'AI & Cloud', skills: ['OpenAI', 'Gemini', 'GCP', 'Kubernetes'] },
  { category: 'Tools',      skills: ['GitHub', 'Postman', 'Figma', 'WebSockets'] },
];

export default function SkillsPanel({ angle, radius }) {
  return (
    <PanelBase angle={angle} radius={radius} label="SKILLS.manifest">
      <h2 className="section-title"><GlitchText>Skills Manifest</GlitchText></h2>

      {/* 3D sphere embedded inside the panel */}
      <div style={{ height: '240px', margin: '0.5rem -1.5rem' }}>
        <SkillSphere3D compact />
      </div>

      {skillData.map(({ category, skills }) => (
        <div key={category}>
          <div className="skill-category">{category}</div>
          <div className="skill-flags">
            {skills.map(s => (
              <span key={s} className="skill-flag">{s}</span>
            ))}
          </div>
        </div>
      ))}
    </PanelBase>
  );
}
