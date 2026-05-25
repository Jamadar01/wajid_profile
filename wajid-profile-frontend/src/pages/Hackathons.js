import React from 'react';

const hacks = [
  {
    rank: 'Top 10',
    name: 'Web Development Hackathon',
    org: 'IIT Hyderabad · Nov 2023',
    desc: 'Ranked Top 10 out of 300+ competing teams. Built a fully functional, production-ready web application end-to-end within the hackathon window.',
    badges: [{ label: '300 Teams', cls: 'gold' }, { label: 'Full-Stack', cls: 'blue' }],
  },
  {
    rank: '24 hrs',
    name: 'AI Amplify Hackathon',
    org: 'Finance-1 × Atrina · Sep 2023',
    desc: 'Designed and deployed a fully functional AI model in a 24-hour intensive sprint challenge hosted by Finance-1 and Atrina Technologies.',
    badges: [{ label: '24H Sprint', cls: 'purple' }, { label: 'AI / ML', cls: 'blue' }],
  },
];

export default function Hackathons() {
  return (
    <section id="hackathons" className="space-section">
      <p className="section-label">Achievements</p>
      <h2 className="section-heading">Hackathons</h2>
      <div className="section-divider" />

      <div className="hack-grid">
        {hacks.map((h, i) => (
          <div key={i} className="glass-card">
            <p className="hack-rank">{h.rank}</p>
            <p className="hack-name">{h.name}</p>
            <p className="hack-org">{h.org}</p>
            <p className="hack-desc">{h.desc}</p>
            <div style={{ marginTop: '1rem' }}>
              {h.badges.map(b => (
                <span key={b.label} className={`hack-badge ${b.cls}`}>{b.label}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
