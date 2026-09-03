import React from 'react';
import { useTheme } from '../context/ThemeContext';

/* Slider switch. Both icons sit in the track and the knob slides between
   them, so the current side is what the knob is covering — a switch, not a
   button that happens to change label. */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      title={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      className={`theme-switch ${isLight ? 'is-light' : 'is-dark'}`}
      onClick={toggle}
    >
      <span className="theme-switch-track" aria-hidden="true">
        <span className="theme-switch-ico theme-switch-moon">☾</span>
        <span className="theme-switch-ico theme-switch-sun">☀</span>
        <span className="theme-switch-knob" />
      </span>
    </button>
  );
}
