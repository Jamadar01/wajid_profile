import React from 'react';
import { useScene } from '../scene/SceneContext';

const NAV = [
  { key: 'hero',       label: '~/home' },
  { key: 'about',      label: '~/about' },
  { key: 'experience', label: '~/experience' },
  { key: 'skills',     label: '~/skills' },
  { key: 'hackathons', label: '~/hackathons' },
];

export default function CockpitHUD() {
  const { active, setActive } = useScene();

  return (
    <div className="hud">
      {/* ── Top bar ── */}
      <div className="hud-top">
        <div className="hud-titlebar">
          <span className="titlebar-dot red" />
          <span className="titlebar-dot yellow" />
          <span className="titlebar-dot green" />
        </div>
        <div className="hud-prompt">
          <span className="prompt-user">wajid</span>
          <span className="prompt-sep">@</span>
          <span className="prompt-host">portfolio</span>
          <span className="prompt-sep">:</span>
          <span className="prompt-path">~/{active}</span>
          <span className="cursor" />
        </div>
        <div className="hud-sysinfo">
          <span className="status-dot" />
          <span>SYS:ONLINE</span>
        </div>
      </div>

      {/* ── Cockpit corner brackets ── */}
      <div className="hud-corner hud-tl" />
      <div className="hud-corner hud-tr" />
      <div className="hud-corner hud-bl" />
      <div className="hud-corner hud-br" />

      {/* ── Center crosshair ── */}
      <div className="hud-crosshair">
        <div className="ch-h" /><div className="ch-v" />
        <div className="ch-ring" />
      </div>

      {/* ── Side scan lines ── */}
      <div className="hud-scanbar left" />
      <div className="hud-scanbar right" />

      {/* ── Bottom nav ── */}
      <div className="hud-bottom">
        <nav className="hud-nav">
          {NAV.map(({ key, label }) => (
            <button
              key={key}
              className={`hud-btn ${active === key ? 'active' : ''}`}
              onClick={() => setActive(key)}
            >
              {active === key && <span className="hud-btn-arrow">▶ </span>}
              {label}
            </button>
          ))}
        </nav>
        <div className="hud-hint">MOVE MOUSE TO LOOK AROUND · CLICK TO NAVIGATE</div>
      </div>
    </div>
  );
}
