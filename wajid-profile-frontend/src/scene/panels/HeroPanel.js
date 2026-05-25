import React from 'react';
import { ReactTyped } from 'react-typed';
import PanelBase from '../PanelBase';
import GlitchText from '../../components/GlitchText';

export default function HeroPanel({ angle, radius }) {
  return (
    <PanelBase angle={angle} radius={radius} label="WAJID.exe — v2.0">
      <div className="hero-panel">
        <div className="hero-pic-wrap">
          <img src="/images/profile.JPG" alt="Wajid Jamadar" className="hero-pic-3d" />
          <div className="hero-pic-scan" />
        </div>

        <div className="hero-typed">
          <ReactTyped
            strings={[
              'whoami — Wajid Jamadar',
              'role -- Full-Stack Developer',
              'stack -- AI · Cloud · WebSockets',
              'status -- Open to Opportunities',
            ]}
            typeSpeed={42}
            backSpeed={22}
            loop
          />
        </div>

        <div className="hero-contact">
          <a href="mailto:wajidjamadar01@gmail.com" target="_blank" rel="noreferrer">[EMAIL]</a>
          <span className="contact-sep"> · </span>
          <a href="https://github.com/Jamadar01" target="_blank" rel="noreferrer">[GITHUB]</a>
          <span className="contact-sep"> · </span>
          <a href="https://www.linkedin.com/in/wajid-jamadar-2b880b20a/" target="_blank" rel="noreferrer">[LINKEDIN]</a>
        </div>

        <a
          href="https://drive.google.com/file/d/1QHDfvKdBQcL-6MtakP_QCbdcI1RIminJ/view?usp=drive_link"
          target="_blank"
          rel="noreferrer"
          className="resume-btn hero-resume-btn"
        >
          ./download --resume
        </a>

        <div className="hero-metrics">
          {[['15+', 'Projects'], ['1200+', 'Commits'], ['50K+', 'Lines']].map(([v, l]) => (
            <div key={l} className="hm-card">
              <div className="hm-value"><GlitchText>{v}</GlitchText></div>
              <div className="hm-label">{l}</div>
            </div>
          ))}
        </div>

        <div className="hero-hint">
          ← move mouse to explore · click nav to fly →
        </div>
      </div>
    </PanelBase>
  );
}
