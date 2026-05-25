import React from 'react';
import PanelBase from '../PanelBase';
import GlitchText from '../../components/GlitchText';

const hackathons = [
  {
    timestamp: '2023-11-12 · IIT Hyderabad',
    title: 'Web Development Hackathon',
    desc: 'Ranked Top 10 out of 300+ teams — built a fully functional, production-ready web app end-to-end within the hackathon window.',
    badges: [{ label: 'TOP 10 / 300', color: 'green' }, { label: 'FULL-STACK', color: 'cyan' }],
  },
  {
    timestamp: '2023-09-08 · Finance-1 × Atrina',
    title: 'AI Amplify Hackathon',
    desc: 'Designed and deployed a working AI model in a 24-hour intensive sprint challenge.',
    badges: [{ label: '24H SPRINT', color: 'pink' }, { label: 'AI / ML', color: 'green' }],
  },
];

const recommendations = [
  { quote: 'Wajid always finds elegant, resourceful solutions.', name: 'John Doe', role: 'Tech Lead @ CompanyX' },
  { quote: 'His problem-solving and teamwork skills are top-notch.', name: 'Jane Smith', role: 'PM @ StartupY' },
  { quote: 'Delivers high-quality work on time. Great team player!', name: 'Alex Lee', role: 'SWE @ DevHouse' },
];

export default function HackathonsPanel({ angle, radius }) {
  return (
    <PanelBase angle={angle} radius={radius} label="HACKATHONS.log">
      <h2 className="section-title"><GlitchText>Hackathon Log</GlitchText></h2>

      {hackathons.map((h, i) => (
        <div key={i} className="hack-entry">
          <div className="hack-timestamp">{h.timestamp}</div>
          <div className="hack-title">{h.title}</div>
          <div className="hack-desc">{h.desc}</div>
          <div className="hack-badges">
            {h.badges.map(b => (
              <span key={b.label} className={`hack-badge ${b.color}`}>{b.label}</span>
            ))}
          </div>
        </div>
      ))}

      <h2 className="section-title" style={{ marginTop: '1.5rem' }}>
        <GlitchText>Testimonials</GlitchText>
      </h2>
      {recommendations.map((r, i) => (
        <div key={i} className="recommendation-card" style={{ marginBottom: '0.8rem' }}>
          <p className="quote">{r.quote}</p>
          <h4 className="name">— {r.name}</h4>
          <span className="role">{r.role}</span>
        </div>
      ))}
    </PanelBase>
  );
}
