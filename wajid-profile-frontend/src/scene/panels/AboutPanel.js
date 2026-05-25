import React from 'react';
import PanelBase from '../PanelBase';
import GlitchText from '../../components/GlitchText';

export default function AboutPanel({ angle, radius }) {
  return (
    <PanelBase angle={angle} radius={radius} label="ABOUT_ME.txt">
      <h2 className="section-title"><GlitchText>About Me</GlitchText></h2>

      <p className="about-line">Software Developer @ Wohlig Transformation — building intelligent, real-time web apps with AI.</p>
      <p className="about-line">Stack: Node.js · React.js · OpenAI · Gemini · GCP · WebSockets · Kubernetes.</p>
      <p className="about-line">Built AI chatbots, recommendation engines, and performance-optimised APIs at scale.</p>
      <p className="about-line">Prev: 43Appmart (PHP/WebSocket/AngularJS) · IBM CSRBOX (React/Bootstrap).</p>
      <p className="about-line">Outside code — dancing, sketching, reading, and writing.</p>

      <div className="terminal-block cyan" data-label="EDUCATION.log" style={{ marginTop: '1.2rem' }}>
        <h2 className="section-title" style={{ fontSize: '0.6rem' }}>Education</h2>
        <p className="about-line">B.Tech Electronics — SPIT, Mumbai (2020–2024)</p>
        <p className="about-line">CGPA: 7.0 · Andheri, Maharashtra</p>
      </div>

      <div className="terminal-block" data-label="HOBBIES.json" style={{ marginTop: '1rem' }}>
        <div className="skill-flags">
          {['Dancing', 'Drawing', 'Reading', 'Writing'].map(h => (
            <span key={h} className="skill-flag">{h}</span>
          ))}
        </div>
      </div>

      <div className="terminal-block pink" data-label="ACTIVITIES.txt" style={{ marginTop: '1rem' }}>
        <p className="about-line"><strong style={{ color: 'var(--neon-cyan)' }}>Creative Head</strong> — Enactus SPIT: led design + video editing.</p>
        <p className="about-line"><strong style={{ color: 'var(--neon-cyan)' }}>Committee Member</strong> — Enactus: social campaigns online + offline.</p>
      </div>
    </PanelBase>
  );
}
