import React from 'react';

const TRANSMISSIONS = [
  {
    signal: 'ALPHA-1',
    quote: 'Wajid is a highly resourceful developer who always finds elegant solutions to complex problems.',
    name: 'John Doe',
    role: 'Tech Lead @ CompanyX',
    strength: 98,
    color: '#8B5CF6',
  },
  {
    signal: 'BETA-2',
    quote: 'His problem-solving and teamwork skills are absolutely top-notch. A pleasure to work with.',
    name: 'Jane Smith',
    role: 'Product Manager @ StartupY',
    strength: 95,
    color: '#06B6D4',
  },
  {
    signal: 'GAMMA-3',
    quote: 'Always delivers high-quality work on time. A genuinely great team player and communicator!',
    name: 'Alex Lee',
    role: 'Software Engineer @ DevHouse',
    strength: 97,
    color: '#EC4899',
  },
];

export default function Recommendations() {
  return (
    <div className="tx-grid">
      {TRANSMISSIONS.map((t, i) => (
        <div key={i} className="tx-card" style={{ borderColor: `${t.color}22` }}>

          <div className="tx-header">
            <span className="tx-status-dot" style={{ background: t.color, boxShadow: `0 0 7px ${t.color}` }} />
            <span className="tx-signal-id" style={{ color: t.color }}>SIGNAL {t.signal}</span>
            <span className="tx-strength">{t.strength}% CLARITY</span>
          </div>

          <div className="tx-wave">
            {Array.from({ length: 26 }, (_, j) => {
              const h = Math.abs(Math.sin(j * 0.75 + i * 1.4)) * 14 + 4;
              return (
                <div
                  key={j}
                  className="tx-bar"
                  style={{
                    height: h,
                    background: t.color,
                    opacity: 0.35 + (j % 4) * 0.12,
                    animationDelay: `${j * 0.06}s`,
                  }}
                />
              );
            })}
          </div>

          <p className="tx-quote">"{t.quote}"</p>

          <div className="tx-source">
            <div>
              <p className="tx-name">{t.name}</p>
              <p className="tx-role">{t.role}</p>
            </div>
            <div
              className="tx-live-badge"
              style={{ borderColor: `${t.color}44`, background: `${t.color}12` }}
            >
              <span style={{ color: t.color }}>LIVE</span>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}
