import React from 'react';
import { useFetch } from '../hooks/useFetch';

export default function Recommendations() {
  const { data: transmissions } = useFetch('/api/recommendations', []);

  return (
    <div className="tx-grid">
      {transmissions.map((t, i) => (
        <div key={t._id} className="tx-card" style={{ borderColor: `${t.color}22` }}>

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
