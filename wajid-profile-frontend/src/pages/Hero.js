import React from 'react';
import { ReactTyped } from 'react-typed';
import { useFetch } from '../hooks/useFetch';

export default function Hero() {
  const { data: profile, loading } = useFetch('/api/profile');

  return (
    <section id="hero" className="hero-section">
      <div className="hero-inner">

        <div className="hero-orbit-wrap" style={{
          transform: 'translate(calc(var(--px, 0) * -8px), calc(var(--py, 0) * -6px))',
          transition: 'transform 0.1s linear',
        }}>
          <div className="hero-orbit-ring-2" />
          <div className="hero-orbit-ring" />
          <img
            src={profile?.profileImage || '/images/profile.JPG'}
            alt={profile?.name || 'Wajid Jamadar'}
            className="hero-avatar"
          />
        </div>

        <p className="hero-greeting">{profile?.greeting || 'Hello, Universe'}</p>

        <h1 className="hero-name">{profile?.name || 'Wajid Jamadar'}</h1>

        <div className="hero-typed-wrap">
          {!loading && profile?.typedStrings?.length > 0 && (
            <ReactTyped
              strings={profile.typedStrings}
              typeSpeed={50}
              backSpeed={30}
              loop
            />
          )}
        </div>

        <p className="hero-desc">{profile?.description}</p>

        <div className="hero-actions">
          <a
            href={profile?.resumeLink || '#'}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
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
    </section>
  );
}
