import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useTheme } from '../context/ThemeContext';
import SectionStatus from '../components/SectionStatus';

const ALL = '__all__';

/* The sky is drawn wide rather than square. Star coordinates arrive as 0-100
   on both axes, so a 1:1 box made the map as tall as the section is wide —
   936px tall on a laptop, with the bottom constellations permanently below the
   fold. Compressing the y axis into SKY_H units keeps the full width and the
   stars spread across it, instead of letterboxing a square into a wide panel. */
const SKY_H  = 60;
const ASPECT = 100 / SKY_H;
const sy = (y) => (y * SKY_H) / 100;

/* Where a project lives. Company work sits inside its mission page and is
   deep-linked to the project's own anchor; personal builds have no page of
   their own, so they point at the planet system. */
function projectHref(p) {
  if (p.kind === 'company' && p.missionSlug) {
    return `/mission/${p.missionSlug}${p.slug ? `#${p.slug}` : ''}`;
  }
  return '/#projects';
}

function ProjectHit({ project }) {
  const color = project.color || '#8B5CF6';
  const href  = projectHref(project);

  return (
    <li className="skill-hit" style={{ borderColor: `${color}33` }}>
      <Link to={href} className="skill-hit-main">
        <span className="skill-hit-emoji" aria-hidden="true">{project.emoji || '🚀'}</span>
        <span className="skill-hit-body">
          <span className="skill-hit-name" style={{ color }}>{project.name}</span>
          <span className="skill-hit-meta">
            {project.kind === 'personal'
              ? 'Personal build'
              : (project.company || 'Company project')}
            {project.draft && <span className="skill-hit-draft">draft</span>}
          </span>
        </span>
      </Link>

      {(project.liveUrl || project.repoUrl) && (
        <span className="skill-hit-links">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer"
               className="skill-hit-link" style={{ color }}>Live ↗</a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer"
               className="skill-hit-link">Code ↗</a>
          )}
        </span>
      )}
    </li>
  );
}

export default function SkillMap() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { data, loading, error } = useFetch('/api/skills/tree');
  const CONSTELLATIONS = useMemo(() => data?.constellations || [], [data]);

  const [hovered, setHovered]  = useState(null);
  const [category, setCategory] = useState(ALL);
  const [selectedId, setSelectedId] = useState(null);

  /* star id -> position, colour and owning category, for drawing lines and
     resolving the selected skill without another pass over the tree */
  const starIndex = useMemo(() => {
    const map = {};
    CONSTELLATIONS.forEach(c => c.stars.forEach(s => {
      map[s.id] = { ...s, color: c.color, category: c.name };
    }));
    return map;
  }, [CONSTELLATIONS]);

  const selected = selectedId ? starIndex[selectedId] : null;

  const pickCategory = (name) => {
    setCategory(name);
    /* a selection from a now-hidden category would leave a stale panel open */
    if (selected && name !== ALL && selected.category !== name) setSelectedId(null);
  };

  /* A category filter used to dim the rest of the sky. It now hides it: with
     one constellation on screen there is room to zoom into it, which is what
     makes the individual skills readable. */
  const visible = category === ALL
    ? CONSTELLATIONS
    : CONSTELLATIONS.filter(c => c.name === category);

  /* Fit the view to whatever is on screen, expanded to the panel's aspect
     ratio so the constellation lands centred rather than letterboxed. */
  const viewBox = useMemo(() => {
    const stars = visible.flatMap(c => c.stars);
    if (category === ALL || !stars.length) return `0 0 100 ${SKY_H}`;

    const pad = 10;
    let minX = Math.min(...stars.map(s => s.x)) - pad;
    let maxX = Math.max(...stars.map(s => s.x)) + pad;
    let minY = Math.min(...stars.map(s => sy(s.y))) - pad / ASPECT;
    let maxY = Math.max(...stars.map(s => sy(s.y))) + pad / ASPECT;

    let w = maxX - minX;
    let h = maxY - minY;

    /* Floor the zoom. A four-star constellation spans ~20 units, and scaling
       that to the full panel blew the stars up to three times their normal
       size — the sky stopped reading as a sky. */
    const MIN_W = 62;
    if (w < MIN_W) {
      const cx = minX + w / 2;
      w = MIN_W;
      minX = cx - w / 2;
      const cy = minY + h / 2;
      h = w / ASPECT;
      minY = cy - h / 2;
    }

    if (w / h < ASPECT) {
      const grown = h * ASPECT;
      minX -= (grown - w) / 2;
      w = grown;
    } else {
      const grown = w / ASPECT;
      minY -= (grown - h) / 2;
      h = grown;
    }
    return `${minX} ${minY} ${w} ${h}`;
  }, [visible, category]);

  const totalSkills = CONSTELLATIONS.reduce((n, c) => n + c.stars.length, 0);
  const shownSkills = category === ALL
    ? totalSkills
    : (CONSTELLATIONS.find(c => c.name === category)?.stars.length || 0);

  return (
    <section id="skills" className="space-section">
      <p className="section-label">Skills</p>
      <h2 className="section-heading">Skill Constellation</h2>
      <div className="section-divider" />
      <p className="about-text" style={{ marginBottom: '0.6rem', maxWidth: 620 }}>
        Every star is a real skill I use, grouped into constellations by category.
      </p>
      <p className="about-text" style={{ marginBottom: '1.5rem', maxWidth: 620 }}>
        <span className="hint-click">Filter</span> by category below ·{' '}
        <span className="hint-hover">click any star</span> to see the projects built with it.
      </p>
      <SectionStatus loading={loading} error={error} empty={!CONSTELLATIONS.length} />

      {/* ── Category filter ── */}
      <div className="constellation-legend">
        <button
          className={`legend-btn ${category === ALL ? 'legend-active' : ''}`}
          onClick={() => pickCategory(ALL)}
          aria-pressed={category === ALL}
        >
          All skills
          <span className="legend-count">({totalSkills})</span>
        </button>

        {CONSTELLATIONS.map(c => {
          const on = category === c.name;
          return (
            <button
              key={c.name}
              className={`legend-btn ${on ? 'legend-active' : ''}`}
              aria-pressed={on}
              /* the inactive state was a 60%-alpha accent, which disappears on a
                 pale ground — on light it keeps full alpha and a firmer border,
                 and the theme filter darkens it for contrast. */
              style={on
                ? { borderColor: c.color, color: c.color, background: `${c.color}18` }
                : isLight
                  ? { borderColor: `${c.color}66`, color: c.color, background: `${c.color}0D` }
                  : { borderColor: `${c.color}33`, color: c.color + '99' }
              }
              onClick={() => pickCategory(c.name)}
            >
              <span className="legend-dot" style={{ background: c.color, boxShadow: `0 0 6px ${c.color}` }} />
              {c.name}
              <span className="legend-count">({c.stars.length})</span>
            </button>
          );
        })}
      </div>

      <div className="starmap-wrap">
        <svg
          viewBox={viewBox}
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
              cy={(Math.cos(i * 97.3) * 0.5 + 0.5) * SKY_H}
              r={0.2}
              className="starmap-dot"
              opacity={0.15 + (i % 5) * 0.05}
            />
          ))}

          {visible.map(c =>
            c.lines.map(([a, b]) => {
              const sa = starIndex[a], sb = starIndex[b];
              if (!sa || !sb) return null;
              return (
                <line
                  key={`${a}-${b}`}
                  x1={sa.x} y1={sy(sa.y)} x2={sb.x} y2={sy(sb.y)}
                  stroke={c.color}
                  strokeWidth={0.25}
                  strokeOpacity={0.45}
                  strokeDasharray="0.6 0.8"
                />
              );
            })
          )}

          {visible.map(c =>
            c.stars.map(s => {
              const isHovered  = hovered === s.id;
              const isSelected = selectedId === s.id;
              const emphasised = isHovered || isSelected;

              return (
                <g key={s.id}>
                  {/* selection ring, so the open panel has a visible source */}
                  {isSelected && (
                    <circle
                      cx={s.x} cy={sy(s.y)} r={s.r * 4.2}
                      fill="none" stroke={c.color} strokeWidth={0.35} strokeOpacity={0.7}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                  <circle
                    cx={s.x} cy={sy(s.y)}
                    r={emphasised ? s.r * 3.5 : s.r * 2}
                    fill={c.color}
                    opacity={emphasised ? 0.2 : 0.06}
                    /* Decoration only. Hit-testable, this halo covers the
                       neighbouring star and its hover never fires. */
                    style={{ transition: 'all 0.25s', pointerEvents: 'none' }}
                  />
                  <circle
                    cx={s.x} cy={sy(s.y)}
                    r={emphasised ? s.r * 1.6 : s.r}
                    fill={c.color}
                    opacity={emphasised ? 1 : 0.85}
                    filter={`url(#glow-${c.name.replace(/\s/g,'')})`}
                    style={{ cursor: 'pointer', transition: 'all 0.25s' }}
                    onMouseEnter={() => setHovered(s.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setSelectedId(id => (id === s.id ? null : s.id))}
                  />
                  {(isHovered || isSelected) && (
                    <text
                      x={s.x + (s.x > 50 ? -1.5 : 1.5)}
                      y={sy(s.y) - s.r - 1.2}
                      fontSize="2.8"
                      fill={c.color}
                      textAnchor={s.x > 50 ? 'end' : 'start'}
                      fontFamily="'Space Grotesk', sans-serif"
                      fontWeight="600"
                      style={{ pointerEvents: 'none' }}
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

      {/* ── Selected skill → the projects that use it ── */}
      {selected ? (
        <div
          className="skill-panel"
          style={{ borderColor: `${selected.color}44`, boxShadow: `0 0 40px ${selected.color}18` }}
        >
          <div className="skill-panel-head">
            <span className="skill-panel-dot" style={{ background: selected.color, boxShadow: `0 0 10px ${selected.color}` }} />
            <div className="skill-panel-title">
              <h3 style={{ color: selected.color }}>{selected.label}</h3>
              <p className="skill-panel-meta">
                {selected.category}
                {' · '}
                {selected.projectCount === 1
                  ? '1 project'
                  : `${selected.projectCount} projects`}
              </p>
            </div>
            <button
              className="planet-close"
              onClick={() => setSelectedId(null)}
              aria-label="Close skill details"
            >✕</button>
          </div>

          {selected.projects?.length ? (
            <ul className="skill-hits">
              {selected.projects.map(p => <ProjectHit key={p._id} project={p} />)}
            </ul>
          ) : (
            <p className="skill-panel-empty">
              Nothing tagged with <strong>{selected.label}</strong> yet — it is on my stack but
              not on a project listed here.
            </p>
          )}
        </div>
      ) : (
        !loading && !!CONSTELLATIONS.length && (
          <p className="skill-panel-prompt">
            Showing {shownSkills} {shownSkills === 1 ? 'skill' : 'skills'}
            {category !== ALL && ` in ${category}`}. Click a star to list its projects.
          </p>
        )
      )}
    </section>
  );
}
