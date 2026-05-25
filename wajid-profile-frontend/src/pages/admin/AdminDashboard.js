import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProfileEditor        from './editors/ProfileEditor';
import AboutEditor          from './editors/AboutEditor';
import SkillsEditor         from './editors/SkillsEditor';
import ExperienceEditor     from './editors/ExperienceEditor';
import ProjectsEditor       from './editors/ProjectsEditor';
import HackathonsEditor     from './editors/HackathonsEditor';
import RecommendationsEditor from './editors/RecommendationsEditor';

const NAV = [
  { key: 'profile',         label: '👤 Profile' },
  { key: 'about',           label: '🛸 About' },
  { key: 'experience',      label: '💼 Experience' },
  { key: 'projects',        label: '🚀 Projects' },
  { key: 'skills',          label: '⚡ Skills' },
  { key: 'hackathons',      label: '🏆 Hackathons' },
  { key: 'recommendations', label: '📡 Recommendations' },
];

const EDITORS = {
  profile:         <ProfileEditor />,
  about:           <AboutEditor />,
  experience:      <ExperienceEditor />,
  projects:        <ProjectsEditor />,
  skills:          <SkillsEditor />,
  hackathons:      <HackathonsEditor />,
  recommendations: <RecommendationsEditor />,
};

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate   = useNavigate();
  const [active, setActive] = useState('profile');

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'monospace', background: '#060612' }}>

      {/* Sidebar */}
      <aside style={{
        width: 220, background: 'rgba(255,255,255,0.03)',
        borderRight: '1px solid rgba(167,139,250,0.15)',
        display: 'flex', flexDirection: 'column', padding: '24px 0', flexShrink: 0,
      }}>
        <div style={{ padding: '0 20px', marginBottom: 32 }}>
          <p style={{ color: '#a78bfa', fontWeight: 700, fontSize: 15, margin: 0 }}>⚙ Admin Panel</p>
          <p style={{ color: '#4b5563', fontSize: 12, margin: '4px 0 0' }}>Portfolio Manager</p>
        </div>

        <nav style={{ flex: 1 }}>
          {NAV.map(n => (
            <button key={n.key} onClick={() => setActive(n.key)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '10px 20px', border: 'none', cursor: 'pointer',
              background: active === n.key ? 'rgba(124,58,237,0.2)' : 'transparent',
              borderLeft: active === n.key ? '3px solid #7c3aed' : '3px solid transparent',
              color: active === n.key ? '#c4b5fd' : '#6b7280',
              fontSize: 13, transition: 'all 0.15s',
            }}>{n.label}</button>
          ))}
        </nav>

        <div style={{ padding: '0 20px' }}>
          <button onClick={handleLogout} style={{
            width: '100%', background: 'rgba(248,113,113,0.1)',
            border: '1px solid rgba(248,113,113,0.25)', borderRadius: 8,
            padding: '8px', color: '#f87171', cursor: 'pointer', fontSize: 13,
          }}>Sign Out</button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>
        {EDITORS[active]}
      </main>
    </div>
  );
}
