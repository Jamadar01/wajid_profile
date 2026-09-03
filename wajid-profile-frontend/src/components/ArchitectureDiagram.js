import React from 'react';

/* Vertical layered stack — one row per architecture layer, connected
   top to bottom. Data shape: [{ layer, tech: [], note }].
   Renders nothing when a project has no architecture recorded yet. */
export default function ArchitectureDiagram({ layers = [], color = '#8B5CF6', label = 'Architecture' }) {
  if (!layers.length) return null;

  return (
    <div className="arch-wrap">
      <p className="arch-title" style={{ color }}>{label}</p>

      <div className="arch-stack">
        {layers.map((l, i) => (
          <div className="arch-row" key={`${l.layer}-${i}`}>
            <div
              className="arch-node"
              style={{ borderColor: `${color}33`, background: `${color}0A` }}
            >
              <div className="arch-node-head">
                <span className="arch-index" style={{ color: `${color}99` }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="arch-layer" style={{ color }}>{l.layer}</span>
              </div>

              {!!(l.tech || []).length && (
                <div className="arch-tech">
                  {l.tech.map(t => (
                    <span
                      key={t}
                      className="arch-tech-chip"
                      style={{ borderColor: `${color}3D`, color: `${color}` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {l.note && <p className="arch-note">{l.note}</p>}
            </div>

            {i < layers.length - 1 && (
              <div className="arch-connector" aria-hidden="true">
                <span className="arch-line" style={{ background: `linear-gradient(${color}55, ${color}22)` }} />
                <span className="arch-arrow" style={{ borderTopColor: `${color}66` }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
