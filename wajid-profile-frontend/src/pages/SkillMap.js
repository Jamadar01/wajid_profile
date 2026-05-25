import React, { useState, useMemo } from 'react';
import { useFetch } from '../hooks/useFetch';

export default function SkillMap() {
  const { data } = useFetch('/api/skills/constellations');
  const CONSTELLATIONS = data?.constellations || [];

  const [hovered, setHovered] = useState(null);
  const [active, setActive]   = useState(null);

  const starMap = useMemo(() => {
    const map = {};
    CONSTELLATIONS.forEach(c => c.stars.forEach(s => {
      map[s.id] = { x: s.x, y: s.y, color: c.color };
    }));
    return map;
  }, [CONSTELLATIONS]);

  const activeCon = active ? CONSTELLATIONS.find(c => c.name === active) : null;

  return (
    <section id="skills" className="space-section">
      <p className="section-label">Skills</p>
      <h2 className="section-heading">Skill Constellation</h2>
      <div className="section-divider" />
      <p className="about-text" style={{ marginBottom: '0.6rem', maxWidth: 560 }}>
        Every star is a real skill I use. Lines group related skills into constellations.
      </p>
      <p className="about-text" style={{ marginBottom: '1.5rem', maxWidth: 560 }}>
        <span style={{ color: '#A78BFA' }}>Hover</span> any star to see its name ·{' '}
        <span style={{ color: '#38BDF8' }}>Click</span> a category below to spotlight that constellation.
      </p>

      <div className="constellation-legend">
        {CONSTELLATIONS.map(c => (
          <button
            key={c.name}
            className={`legend-btn ${active === c.name ? 'legend-active' : ''}`}
            style={active === c.name
              ? { borderColor: c.color, color: c.color, background: `${c.color}18` }
              : { borderColor: `${c.color}33`, color: c.color + '99' }
            }
            onClick={() => setActive(a => a === c.name ? null : c.name)}
          >
            <span className="legend-dot" style={{ background: c.color, boxShadow: `0 0 6px ${c.color}` }} />
            {c.name}
            <span className="legend-count">({c.stars.length})</span>
          </button>
        ))}
      </div>

      <div className="starmap-wrap">
        <svg
          viewBox="0 0 100 100"
          className="starmap-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {CONSTELLATIONS.map(c => (
              <filter key={c.name} id={`glow-${c.name.replace(/\s/g,'')}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            ))}
          </defs>

          {Array.from({ length: 60 }, (_, i) => (
            <circle
              key={i}
              cx={(Math.sin(i * 137.5) * 0.5 + 0.5) * 100}
              cy={(Math.cos(i * 97.3) * 0.5 + 0.5) * 100}
              r={0.2}
              fill="white"
              opacity={0.15 + (i % 5) * 0.05}
            />
          ))}

          {CONSTELLATIONS.map(c =>
            c.lines.map(([a, b]) => {
              const sa = starMap[a], sb = starMap[b];
              if (!sa || !sb) return null;
              const isActive = !activeCon || activeCon.name === c.name;
              return (
                <line
                  key={`${a}-${b}`}
                  x1={sa.x} y1={sa.y} x2={sb.x} y2={sb.y}
                  stroke={c.color}
                  strokeWidth={0.25}
                  strokeOpacity={isActive ? 0.45 : 0.06}
                  strokeDasharray="0.6 0.8"
                  style={{ transition: 'stroke-opacity 0.4s' }}
                />
              );
            })
          )}

          {CONSTELLATIONS.map(c =>
            c.stars.map(s => {
              const isActive = !activeCon || activeCon.name === c.name;
              const isHovered = hovered === s.id;
              return (
                <g key={s.id}>
                  <circle
                    cx={s.x} cy={s.y}
                    r={isHovered ? s.r * 3.5 : s.r * 2}
                    fill={c.color}
                    opacity={isHovered ? 0.2 : 0.06}
                    style={{ transition: 'all 0.25s' }}
                  />
                  <circle
                    cx={s.x} cy={s.y}
                    r={isHovered ? s.r * 1.6 : s.r}
                    fill={c.color}
                    opacity={isActive ? (isHovered ? 1 : 0.85) : 0.15}
                    filter={`url(#glow-${c.name.replace(/\s/g,'')})`}
                    style={{ cursor: 'pointer', transition: 'all 0.25s' }}
                    onMouseEnter={() => setHovered(s.id)}
                    onMouseLeave={() => setHovered(null)}
                  />
                  {isHovered && (
                    <text
                      x={s.x + (s.x > 50 ? -1.5 : 1.5)}
                      y={s.y - s.r - 1.2}
                      fontSize="2.8"
                      fill={c.color}
                      textAnchor={s.x > 50 ? 'end' : 'start'}
                      fontFamily="'Space Grotesk', sans-serif"
                      fontWeight="600"
                      opacity={1}
                    >
                      {s.label}
                    </text>
                  )}
                </g>
              );
            })
          )}
        </svg>
      </div>
    </section>
  );
}
