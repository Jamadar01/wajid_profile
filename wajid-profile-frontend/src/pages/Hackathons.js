import React from 'react';
import { useFetch } from '../hooks/useFetch';

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
  const { data: hacks } = useFetch('/api/hackathons', []);

  return (
    <section id="hackathons" className="space-section">
      <p className="section-label">Achievements</p>
      <h2 className="section-heading">Space Trophies</h2>
      <div className="section-divider" />

      <div className="hack-grid">
        {hacks.map((h) => (
          <div
            key={h._id}
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
