import React from 'react';
import Tilt from 'react-parallax-tilt';
import PerformanceMetrics from '../components/PerformanceMetrics';
import { useFetch } from '../hooks/useFetch';

const TILT = {
  transitionSpeed: 1400,
  glareEnable: true,
  glareMaxOpacity: 0.07,
  glareColor: '#a78bfa',
  glarePosition: 'all',
  gyroscope: true,
};

export default function About() {
  const { data: about } = useFetch('/api/about');

  const chips   = about?.statusChips      || [];
  const bio     = about?.bio              || [];
  const hobbies = about?.hobbies          || [];
  const edu     = about?.education        || {};
  const extras  = about?.extracurriculars || [];

  return (
    <section id="about" className="space-section">
      <p className="section-label">Who I Am</p>
      <h2 className="section-heading">Crew Profile</h2>
      <div className="section-divider" />

      {/* Status chips */}
      <div className="about-status-bar">
        {chips.map(c => (
          <div key={c.label} className="status-chip" style={{ borderColor: `${c.color}40` }}>
            <span className="status-chip-label">{c.label}</span>
            <span className="status-chip-value" style={{ color: c.color }}>{c.value}</span>
          </div>
        ))}
      </div>

      <div className="about-grid">

        {/* ── Bio card ── */}
        <Tilt {...TILT} tiltMaxAngleX={8} tiltMaxAngleY={10} scale={1.03}
          style={{ transformStyle: 'preserve-3d', height: '100%' }}>
          <div className="glass-card about-tilt-card" style={{ transformStyle: 'preserve-3d', height: '100%' }}>

            <div className="about-card-float-icon" style={{ transform: 'translateZ(50px)' }}>📡</div>

            <p className="card-micro-label" style={{ transform: 'translateZ(30px)', display: 'inline-block' }}>
              CREW BIO
            </p>
            <div className="about-scan" />

            {bio.map((para, i) => (
              <p key={i} className="about-text" dangerouslySetInnerHTML={{ __html: para }} />
            ))}

            <div className="tag-cloud" style={{ marginTop: '1.2rem' }}>
              {hobbies.map(h => (
                <span key={h} className="space-tag about-tag-3d" style={{ transform: 'translateZ(20px)' }}>
                  {h}
                </span>
              ))}
            </div>
          </div>
        </Tilt>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* ── Education card ── */}
          <Tilt {...TILT} tiltMaxAngleX={10} tiltMaxAngleY={8} scale={1.03}
            style={{ transformStyle: 'preserve-3d' }}>
            <div className="glass-card about-tilt-card" style={{ transformStyle: 'preserve-3d' }}>

              <div className="about-card-float-icon" style={{ transform: 'translateZ(50px)' }}>🎓</div>

              <p className="card-micro-label" style={{ transform: 'translateZ(30px)', display: 'inline-block' }}>
                BASE CAMP
              </p>
              <p className="edu-label" style={{ transform: 'translateZ(20px)', display: 'block' }}>Education</p>
              <p className="edu-school">{edu.school}</p>
              <p className="edu-detail">{edu.degree} · {edu.period}</p>
              <p className="edu-detail" style={{ marginTop: '0.3rem' }}>CGPA {edu.cgpa} · {edu.location}</p>
            </div>
          </Tilt>

          {/* ── Extras card ── */}
          <Tilt {...TILT} tiltMaxAngleX={6} tiltMaxAngleY={12} scale={1.03}
            style={{ transformStyle: 'preserve-3d' }}>
            <div className="glass-card about-tilt-card" style={{ transformStyle: 'preserve-3d' }}>

              <div className="about-card-float-icon" style={{ transform: 'translateZ(50px)' }}>⭐</div>

              <p className="card-micro-label" style={{ transform: 'translateZ(30px)', display: 'inline-block' }}>
                CREW ACTIVITIES
              </p>
              <p className="edu-label">Extra-Curricular</p>
              {extras.map((e, i) => (
                <p key={i} className="about-text" style={{ marginBottom: '0.5rem' }}>
                  <strong className="extra-role">{e.role}</strong> — {e.org}: {e.desc}
                </p>
              ))}
            </div>
          </Tilt>

        </div>
      </div>

      <PerformanceMetrics />
    </section>
  );
}
