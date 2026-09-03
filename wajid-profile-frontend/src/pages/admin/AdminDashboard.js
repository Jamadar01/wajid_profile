import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../../components/ThemeToggle';
import ProfileEditor        from './editors/ProfileEditor';
import AboutEditor          from './editors/AboutEditor';
import SkillsEditor         from './editors/SkillsEditor';
import ExperienceEditor     from './editors/ExperienceEditor';
import ProjectsEditor       from './editors/ProjectsEditor';
import CertificationsEditor from './editors/CertificationsEditor';
import HackathonsEditor     from './editors/HackathonsEditor';
import RecommendationsEditor from './editors/RecommendationsEditor';
import MessagesInbox         from './editors/MessagesInbox';

const NAV = [
  { key: 'profile',         label: '👤 Profile' },
  { key: 'about',           label: '🛸 About' },
  { key: 'experience',      label: '💼 Experience' },
  { key: 'projects',        label: '🚀 Projects' },
  { key: 'skills',          label: '⚡ Skills' },
  { key: 'certifications',  label: '📜 Certifications' },
  { key: 'hackathons',      label: '🏆 Hackathons' },
  { key: 'recommendations', label: '📡 Recommendations' },
  { key: 'messages',        label: '📬 Messages' },
];

const EDITORS = {
  profile:         <ProfileEditor />,
  about:           <AboutEditor />,
  experience:      <ExperienceEditor />,
  projects:        <ProjectsEditor />,
  skills:          <SkillsEditor />,
  certifications:  <CertificationsEditor />,
  hackathons:      <HackathonsEditor />,
  recommendations: <RecommendationsEditor />,
  messages:        <MessagesInbox />,
};

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate   = useNavigate();
  const [active, setActive] = useState('profile');

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div style={{
      display: 'flex', height: '100vh', overflow: 'hidden',
      fontFamily: 'monospace', background: 'var(--space)',
    }}>

      {/* Sidebar */}
      {/* Full-height rail. The shell is exactly 100vh and <main> is the only
          scroller, so the nav, theme switch and sign-out never leave the
          viewport — previously the sidebar stretched with the content and
          pushed them below the fold on long editors. */}
      <aside style={{
        width: 220, background: 'var(--surface-1)',
        borderRight: '1px solid rgba(167,139,250,0.15)',
        display: 'flex', flexDirection: 'column', padding: '24px 0',
        flexShrink: 0, height: '100%', overflowY: 'auto',
      }}>
        <div style={{ padding: '0 20px', marginBottom: 32 }}>
          <p style={{ color: 'var(--purple)', fontWeight: 700, fontSize: 15, margin: 0 }}>⚙ Admin Panel</p>
          <p style={{ color: 'var(--text-dim)', fontSize: 12, margin: '4px 0 0' }}>Portfolio Manager</p>
        </div>

        <nav style={{ flex: 1 }}>
          {NAV.map(n => (
            <button key={n.key} onClick={() => setActive(n.key)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '10px 20px', border: 'none', cursor: 'pointer',
              background: active === n.key ? 'rgba(124,58,237,0.2)' : 'transparent',
              borderLeft: active === n.key ? '3px solid var(--purple)' : '3px solid transparent',
              color: active === n.key ? 'var(--accent-soft)' : 'var(--text-mid)',
              fontSize: 13, transition: 'all 0.15s',
            }}>{n.label}</button>
          ))}
        </nav>

        <div style={{
          padding: '0 20px 14px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 10,
        }}>
          <span style={{ color: 'var(--text-dim)', fontSize: 11, letterSpacing: 1 }}>THEME</span>
          <ThemeToggle />
        </div>

        <div style={{ padding: '0 20px' }}>
          <button onClick={handleLogout} style={{
            width: '100%', background: 'rgba(248,113,113,0.1)',
            border: '1px solid rgba(248,113,113,0.25)', borderRadius: 8,
            padding: '8px', color: 'var(--danger)', cursor: 'pointer', fontSize: 13,
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
