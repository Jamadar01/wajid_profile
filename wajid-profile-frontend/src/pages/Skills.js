import React from 'react';

const skillGroups = [
  { label: 'Languages',  skills: ['JavaScript', 'Python', 'C++', 'Java', 'C'] },
  { label: 'Frontend',   skills: ['React.js', 'AngularJS', 'HTML5', 'CSS3', 'Bootstrap'] },
  { label: 'Backend',    skills: ['Node.js', 'Express.js', 'Django', 'PHP'] },
  { label: 'Databases',  skills: ['MongoDB', 'MySQL', 'Pinecone'] },
  { label: 'AI & Cloud', skills: ['OpenAI', 'Gemini', 'Google Vertex AI', 'GCP', 'Kubernetes'] },
  { label: 'Real-time',  skills: ['WebSockets', 'REST APIs'] },
  { label: 'Tools',      skills: ['GitHub', 'Postman', 'Figma', 'Canva', 'Appsmith'] },
];

export default function Skills() {
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
