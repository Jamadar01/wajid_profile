import React from 'react';
import { ReactTyped } from 'react-typed';

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-inner">

        {/* Orbital avatar */}
        <div className="hero-orbit-wrap" style={{
          transform: 'translate(calc(var(--px, 0) * -8px), calc(var(--py, 0) * -6px))',
          transition: 'transform 0.1s linear',
        }}>
          <div className="hero-orbit-ring-2" />
          <div className="hero-orbit-ring" />
          <img src="/images/profile.JPG" alt="Wajid Jamadar" className="hero-avatar" />
        </div>

        <p className="hero-greeting">Hello, Universe</p>

        <h1 className="hero-name">Wajid Jamadar</h1>

        <div className="hero-typed-wrap">
          <ReactTyped
            strings={[
              'Full-Stack Developer',
              'AI Enthusiast',
              'Open Source Contributor',
              'Cloud Engineer',
            ]}
            typeSpeed={50}
            backSpeed={30}
            loop
          />
        </div>

        <p className="hero-desc">
          Building intelligent, real-time web applications with AI, Cloud, and WebSockets.
          Currently at Wohlig Transformation — passionate about clean code and elegant solutions.
        </p>

        <div className="hero-actions">
          <a
            href="https://drive.google.com/file/d/1QHDfvKdBQcL-6MtakP_QCbdcI1RIminJ/view?usp=drive_link"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Download Resume
          </a>
          <a href="#experience" className="btn-ghost">View My Work</a>
        </div>

        <div className="hero-links">
          <a href="mailto:wajidjamadar01@gmail.com" className="hero-link">✉ Email</a>
          <a href="https://github.com/Jamadar01" target="_blank" rel="noreferrer" className="hero-link">⌥ GitHub</a>
          <a href="https://www.linkedin.com/in/wajid-jamadar-2b880b20a/" target="_blank" rel="noreferrer" className="hero-link">in LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
