import React from 'react';
import { ReactTyped } from 'react-typed';
import { useFetch } from '../hooks/useFetch';

const TECH_BADGES = [
  { label: 'Node.js',   style: { top: '8%',   right: '-18%' }, delay: '0s' },
  { label: 'React',     style: { top: '35%',  left: '-20%'  }, delay: '1.2s' },
  { label: 'AI / LLM',  style: { bottom: '28%', right: '-16%' }, delay: '0.6s' },
  { label: 'MongoDB',   style: { bottom: '8%', left: '-14%'  }, delay: '1.8s' },
];

export default function Hero() {
  const { data: profile, loading } = useFetch('/api/profile');
  const avail = profile?.availability;

  return (
    <section id="hero" className="hero-section">
      <div className="hero-inner hero-split">

        {/* ── Left: text ── */}
        <div className="hero-text">

          <div className="hero-status-badge">
            <span className="hero-status-dot" />
            {avail?.open === false
              ? (avail.closedLabel || 'Not currently looking')
              : (avail?.status || 'Open to opportunities')}
          </div>

          <p className="hero-greeting">{profile?.greeting || 'Hello, Universe'}</p>

          <h1 className="hero-name">{profile?.name || 'Wajid Jamadar'}</h1>

          <div className="hero-typed-wrap">
            <span className="hero-typed-prefix">~/&gt;&nbsp;</span>
            {!loading && (
              <ReactTyped
                strings={profile?.typedStrings?.length ? profile.typedStrings : ['Full-Stack Developer', 'AI Enthusiast']}
                typeSpeed={50}
                backSpeed={30}
                loop
              />
            )}
          </div>

          <p className="hero-desc">{profile?.description || 'Building intelligent, real-time web applications with AI, Cloud, and WebSockets.'}</p>

          <div className="hero-actions">
            <a href={profile?.resumeLink || '#'} target="_blank" rel="noreferrer" className="btn-primary">
              Download Resume
            </a>
            <a href="#experience" className="btn-ghost">View My Work</a>
          </div>

          <div className="hero-links">
            <a href={`mailto:${profile?.social?.email || ''}`} className="hero-link">✉ Email</a>
            <a href={profile?.social?.github || '#'} target="_blank" rel="noreferrer" className="hero-link">⌥ GitHub</a>
            <a href={profile?.social?.linkedin || '#'} target="_blank" rel="noreferrer" className="hero-link">in LinkedIn</a>
          </div>

        </div>

        {/* ── Right: visual ── */}
        <div className="hero-visual">
          <div
            className="hero-orbit-wrap"
            style={{
              transform: 'translate(calc(var(--px, 0) * -8px), calc(var(--py, 0) * -6px))',
              transition: 'transform 0.1s linear',
            }}
          >
            <div className="hero-orbit-ring-3" />
            <div className="hero-orbit-ring-2" />
            <div className="hero-orbit-ring" />
            <img
              src={profile?.profileImage || '/images/profile.JPG'}
              alt={profile?.name || 'Wajid Jamadar'}
              className="hero-avatar"
            />

            {TECH_BADGES.map(b => (
              <div
                key={b.label}
                className="hero-badge-float"
                style={{ ...b.style, animationDelay: b.delay }}
              >
                {b.label}
              </div>
            ))}
          </div>

          <div className="hero-coords">
            <span>19.0760° N</span>
            <span>72.8777° E</span>
            <span style={{ color: '#34d399' }}>● Mumbai</span>
          </div>
        </div>

      </div>
    </section>
  );
}
