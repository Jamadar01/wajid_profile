import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api';
import StarField from '../components/StarField';
import NebulaOrbs from '../components/NebulaOrbs';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

const FALLBACK_COLOR = '#8B5CF6';

/* Colour a project inherits when its own colour is unset */
const tint = (project, missionColor) => project.color || missionColor;

function CaseStudy({ project, color }) {
  const blocks = [
    ['The Problem',   project.problem],
    ['What I Built',  project.solution],
    ['The Result',    project.result],
  ].filter(([, body]) => body);

  if (!blocks.length) return null;

  return (
    <div className="case-study">
      {blocks.map(([label, body]) => (
        <div className="case-block" key={label}>
          <p className="case-label" style={{ color }}>{label}</p>
          <p className="case-text">{body}</p>
        </div>
      ))}
    </div>
  );
}

function ProjectBlock({ project, index, missionColor }) {
  const color = tint(project, missionColor);

  return (
    <article
      className="mission-project"
      id={project.slug || project._id}
      style={{ borderColor: `${color}26` }}
    >
      <div className="mission-project-head">
        <span className="mission-project-emoji" style={{ background: `${color}14`, borderColor: `${color}33` }}>
          {project.emoji || '🚀'}
        </span>

        <div className="mission-project-title">
          <p className="mission-project-index" style={{ color: `${color}99` }}>
            PROJECT {String(index + 1).padStart(2, '0')}
          </p>
          <h3 style={{ color }}>{project.name}</h3>
          <p className="mission-project-meta">
            {[project.role, project.timeline].filter(Boolean).join(' · ')}
          </p>
        </div>

        {project.draft && (
          <span className="mission-draft-badge" title="Details still to be written">
            DRAFT
          </span>
        )}
      </div>

      {project.desc && <p className="mission-project-desc">{project.desc}</p>}

      {!!(project.tech || []).length && (
        <div className="mission-tech-row">
          {project.tech.map(t => (
            <span key={t} className="planet-chip" style={{ borderColor: `${color}44`, color }}>
              {t}
            </span>
          ))}
        </div>
      )}

      <CaseStudy project={project} color={color} />

      {!!(project.highlights || []).length && (
        <div className="mission-highlights">
          <p className="case-label" style={{ color }}>Highlights</p>
          <ul className="exp-points">
            {project.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </div>
      )}

      <ArchitectureDiagram layers={project.architecture} color={color} />

      {(project.liveUrl || project.repoUrl) && (
        <div className="planet-detail-links">
          {project.liveUrl && (
            <a className="btn-primary" href={project.liveUrl} target="_blank" rel="noreferrer"
               style={{ padding: '8px 20px', fontSize: '0.82rem' }}>
              Live ↗
            </a>
          )}
          {project.repoUrl && (
            <a className="btn-ghost" href={project.repoUrl} target="_blank" rel="noreferrer"
               style={{ padding: '7px 18px', fontSize: '0.82rem' }}>
              View Code ↗
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default function MissionDetail() {
  const { slug } = useParams();
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    api.get(`/api/experience/${slug}`)
      .then(d  => { if (!cancelled) setData(d); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(()=> { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [slug]);

  const experience = data?.experience;
  const projects   = data?.projects || [];
  const color      = experience?.color || FALLBACK_COLOR;

  return (
    <>
      <StarField />
      <NebulaOrbs />

      <nav className="space-nav">
        <Link to="/" className="nav-logo">Wajid Jamadar</Link>
        <div className="nav-links-bar">
          <Link to="/#experience" className="nav-link">← All Missions</Link>
        </div>
      </nav>

      <main className="page-content">
        <section className="space-section mission-page">
          {loading && (
            <div className="section-status">
              <span className="uplink-dot" />
              Opening mission log…
            </div>
          )}

          {!loading && error && (
            <div className="mission-empty">
              <p className="notfound-code" style={{ fontSize: '3rem' }}>404</p>
              <h2 className="section-heading">Mission not found</h2>
              <p className="about-text" style={{ maxWidth: 460, margin: '0 auto 1.6rem' }}>
                No log exists at this coordinate — the record may have been renamed or removed.
              </p>
              <Link to="/#experience" className="btn-primary">Back to Mission Log</Link>
            </div>
          )}

          {!loading && !error && experience && (
            <>
              <Link to="/#experience" className="mission-back">← Mission Log</Link>

              {/* ── Mission header ── */}
              <header className="mission-hero" style={{ borderColor: `${color}26` }}>
                <div className="mission-hero-glow" style={{ background: `radial-gradient(circle, ${color}22 0%, transparent 70%)` }} />

                <div className="mission-hero-main">
                  {experience.image && (
                    <img src={experience.image} alt={experience.company} className="mission-logo" />
                  )}
                  <div>
                    <p className="section-label" style={{ color, marginBottom: 6 }}>Mission Log</p>
                    <h1 className="mission-company">{experience.company}</h1>
                    <p className="mission-role" style={{ color }}>{experience.role}</p>
                    <p className="exp-duration">
                      {[experience.duration, experience.location].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                </div>

                <div className="mission-stat-row">
                  <div className="mission-stat">
                    <span className="mission-stat-num" style={{ color }}>{projects.length}</span>
                    <span className="mission-stat-label">Projects</span>
                  </div>
                  <div className="mission-stat">
                    <span className="mission-stat-num" style={{ color }}>
                      {new Set(projects.flatMap(p => p.tech || [])).size}
                    </span>
                    <span className="mission-stat-label">Technologies</span>
                  </div>
                  {experience.link && (
                    <a className="btn-ghost" href={experience.link} target="_blank" rel="noreferrer"
                       style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
                      Visit Company ↗
                    </a>
                  )}
                </div>
              </header>

              {experience.summary && (
                <p className="mission-summary">{experience.summary}</p>
              )}

              {/* ── Skills used here ── */}
              {!!(experience.skillGroups || []).length && (
                <section className="mission-block">
                  <h2 className="mission-block-title" style={{ color }}>Skills Deployed</h2>
                  <div className="section-divider" style={{ marginBottom: '1.4rem' }} />
                  <div className="mission-skill-groups">
                    {experience.skillGroups.map(g => (
                      <div className="mission-skill-group" key={g.label}>
                        <p className="mission-skill-label">{g.label}</p>
                        <div className="skill-chips">
                          {(g.items || []).map(s => (
                            <span key={s} className="skill-chip">{s}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── What I did ── */}
              {!!(experience.responsibilities || []).length && (
                <section className="mission-block">
                  <h2 className="mission-block-title" style={{ color }}>Responsibilities</h2>
                  <div className="section-divider" style={{ marginBottom: '1.4rem' }} />
                  <ul className="exp-points">
                    {experience.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </section>
              )}

              {!!(experience.impact || []).length && (
                <section className="mission-block">
                  <h2 className="mission-block-title" style={{ color }}>Impact</h2>
                  <div className="section-divider" style={{ marginBottom: '1.4rem' }} />
                  <ul className="exp-points">
                    {experience.impact.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </section>
              )}

              {/* ── Projects shipped here ── */}
              <section className="mission-block">
                <h2 className="mission-block-title" style={{ color }}>Projects Shipped</h2>
                <div className="section-divider" style={{ marginBottom: '1.4rem' }} />

                {projects.length ? (
                  <div className="mission-project-list">
                    {projects.map((p, i) => (
                      <ProjectBlock key={p._id} project={p} index={i} missionColor={color} />
                    ))}
                  </div>
                ) : (
                  <p className="about-text" style={{ maxWidth: 560 }}>
                    No projects recorded for this mission yet.
                  </p>
                )}
              </section>

              <div className="mission-footer-nav">
                <Link to="/#experience" className="btn-ghost">← All Missions</Link>
                <Link to="/#projects" className="btn-primary">My Planet System →</Link>
              </div>
            </>
          )}
        </section>

        <footer className="space-footer">
          Built with ♥ by <a href="https://github.com/Jamadar01" target="_blank" rel="noreferrer">Wajid Jamadar</a> · {new Date().getFullYear()}
        </footer>
      </main>
    </>
  );
}
