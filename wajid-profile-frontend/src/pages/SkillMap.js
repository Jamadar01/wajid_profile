import React, { useState } from 'react';

const CONSTELLATIONS = [
  {
    name: 'Languages', color: '#A78BFA',
    stars: [
      { id: 'js',   label: 'JavaScript', x: 14, y: 20, r: 1.1 },
      { id: 'py',   label: 'Python',     x: 23, y: 30, r: 1.0 },
      { id: 'cpp',  label: 'C++',        x: 9,  y: 39, r: 0.9 },
      { id: 'java', label: 'Java',       x: 19, y: 13, r: 0.9 },
      { id: 'c',    label: 'C',          x: 5,  y: 27, r: 0.8 },
    ],
    lines: [['js','py'],['py','cpp'],['cpp','c'],['js','java'],['java','py']],
  },
  {
    name: 'Frontend', color: '#38BDF8',
    stars: [
      { id: 'react',     label: 'React.js',  x: 68, y: 12, r: 1.1 },
      { id: 'angular',   label: 'AngularJS', x: 80, y: 19, r: 0.9 },
      { id: 'html',      label: 'HTML5',     x: 74, y: 28, r: 0.9 },
      { id: 'css3',      label: 'CSS3',      x: 85, y: 24, r: 0.8 },
      { id: 'bootstrap', label: 'Bootstrap', x: 82, y: 36, r: 0.8 },
    ],
    lines: [['react','html'],['html','css3'],['html','angular'],['angular','bootstrap'],['css3','bootstrap']],
  },
  {
    name: 'Backend', color: '#34D399',
    stars: [
      { id: 'node',    label: 'Node.js',    x: 18, y: 58, r: 1.1 },
      { id: 'express', label: 'Express.js', x: 29, y: 66, r: 0.9 },
      { id: 'django',  label: 'Django',     x: 11, y: 73, r: 0.8 },
      { id: 'php',     label: 'PHP',        x: 24, y: 79, r: 0.8 },
    ],
    lines: [['node','express'],['express','django'],['express','php']],
  },
  {
    name: 'Databases', color: '#FCD34D',
    stars: [
      { id: 'mongo',    label: 'MongoDB',  x: 47, y: 50, r: 1.0 },
      { id: 'mysql',    label: 'MySQL',    x: 57, y: 58, r: 0.9 },
      { id: 'pinecone', label: 'Pinecone', x: 43, y: 65, r: 0.8 },
    ],
    lines: [['mongo','mysql'],['mongo','pinecone'],['mysql','pinecone']],
  },
  {
    name: 'AI & Cloud', color: '#F472B6',
    stars: [
      { id: 'openai',  label: 'OpenAI',     x: 72, y: 52, r: 1.1 },
      { id: 'gemini',  label: 'Gemini',     x: 83, y: 60, r: 1.0 },
      { id: 'gcp',     label: 'GCP',        x: 76, y: 70, r: 0.9 },
      { id: 'k8s',     label: 'Kubernetes', x: 65, y: 76, r: 0.8 },
      { id: 'vertex',  label: 'Vertex AI',  x: 91, y: 48, r: 0.8 },
    ],
    lines: [['openai','gemini'],['gemini','gcp'],['gcp','k8s'],['openai','vertex'],['gemini','vertex']],
  },
  {
    name: 'Tools', color: '#60A5FA',
    stars: [
      { id: 'github',  label: 'GitHub',     x: 35, y: 86, r: 0.9 },
      { id: 'postman', label: 'Postman',    x: 46, y: 92, r: 0.8 },
      { id: 'figma',   label: 'Figma',      x: 56, y: 87, r: 0.8 },
      { id: 'ws',      label: 'WebSockets', x: 65, y: 93, r: 0.8 },
    ],
    lines: [['github','postman'],['postman','figma'],['figma','ws']],
  },
];

/* Build a lookup map id → {x,y} for drawing lines */
const starMap = {};
CONSTELLATIONS.forEach(c => c.stars.forEach(s => { starMap[s.id] = { x: s.x, y: s.y, color: c.color }; }));

export default function SkillMap() {
  const [hovered, setHovered] = useState(null);
  const [active, setActive]   = useState(null);

  const activeCon = active
    ? CONSTELLATIONS.find(c => c.name === active)
    : null;

  return (
    <section id="skills" className="space-section">
      <p className="section-label">Skills</p>
      <h2 className="section-heading">Star Map</h2>
      <div className="section-divider" />
      <p className="about-text" style={{ marginBottom: '1.5rem', maxWidth: 560 }}>
        Each star is a skill. Lines connect related skills into constellations. Hover a star — click a legend to highlight.
      </p>

      {/* Legend */}
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
          </button>
        ))}
      </div>

      {/* SVG constellation map */}
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

          {/* Background micro-stars */}
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

          {/* Constellation lines */}
          {CONSTELLATIONS.map(c =>
            c.lines.map(([a, b]) => {
              const sa = starMap[a], sb = starMap[b];
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

          {/* Stars */}
          {CONSTELLATIONS.map(c =>
            c.stars.map(s => {
              const isActive = !activeCon || activeCon.name === c.name;
              const isHovered = hovered === s.id;
              return (
                <g key={s.id}>
                  {/* Outer glow ring */}
                  <circle
                    cx={s.x} cy={s.y}
                    r={isHovered ? s.r * 3.5 : s.r * 2}
                    fill={c.color}
                    opacity={isHovered ? 0.2 : 0.06}
                    style={{ transition: 'all 0.25s' }}
                  />
                  {/* Star body */}
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
                  {/* Label — shows on hover */}
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
