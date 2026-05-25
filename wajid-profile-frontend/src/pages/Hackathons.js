import React from 'react';

const hacks = [
  {
    rank: 'Top 10',
    name: 'Web Development Hackathon',
    org: 'IIT Hyderabad · Nov 2023',
    desc: 'Ranked Top 10 out of 300+ competing teams. Built a fully functional, production-ready web application end-to-end within the hackathon window.',
    badges: [{ label: '300 Teams', cls: 'gold' }, { label: 'Full-Stack', cls: 'blue' }],
    color: '#FCD34D',
    glow: 'rgba(252,211,77,0.4)',
    emoji: '🏆',
    orbitDur: '10s',
  },
  {
    rank: '24 hrs',
    name: 'AI Amplify Hackathon',
    org: 'Finance-1 × Atrina · Sep 2023',
    desc: 'Designed and deployed a fully functional AI model in a 24-hour intensive sprint challenge hosted by Finance-1 and Atrina Technologies.',
    badges: [{ label: '24H Sprint', cls: 'purple' }, { label: 'AI / ML', cls: 'blue' }],
    color: '#A78BFA',
    glow: 'rgba(167,139,250,0.4)',
    emoji: '⚡',
    orbitDur: '13s',
  },
];

function TrophyBadge({ h }) {
  return (
    <div className="hack-trophy-wrap">
      <div
        className="hack-trophy-orbit"
        style={{ borderColor: `${h.color}28`, animationDuration: h.orbitDur }}
      >
        <span className="hack-trophy-dot" style={{ background: h.color, boxShadow: `0 0 10px ${h.color}` }} />
      </div>
      <div
        className="hack-trophy-badge"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${h.color}28 0%, ${h.color}08 65%, transparent 85%)`,
          borderColor: `${h.color}44`,
          boxShadow: `0 0 50px ${h.glow}, inset 0 0 30px ${h.color}0a`,
        }}
      >
        <span className="hack-trophy-emoji">{h.emoji}</span>
        <p className="hack-trophy-rank" style={{ color: h.color }}>{h.rank}</p>
      </div>
    </div>
  );
}

export default function Hackathons() {
  return (
    <section id="hackathons" className="space-section">
      <p className="section-label">Achievements</p>
      <h2 className="section-heading">Space Trophies</h2>
      <div className="section-divider" />

      <div className="hack-grid">
        {hacks.map((h, i) => (
          <div
            key={i}
            className="hack-card"
            style={{ borderColor: `${h.color}22` }}
          >
            <div
              className="hack-card-glow-top"
              style={{ background: `linear-gradient(to bottom, ${h.color}18, transparent)` }}
            />
            <TrophyBadge h={h} />
            <div className="hack-card-body">
              <p className="hack-name">{h.name}</p>
              <p className="hack-org">{h.org}</p>
              <p className="hack-desc">{h.desc}</p>
              <div className="hack-card-badges">
                {h.badges.map(b => (
                  <span key={b.label} className={`hack-badge ${b.cls}`}>{b.label}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
