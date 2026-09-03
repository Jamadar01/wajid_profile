import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'theme';
const ThemeContext = createContext({ theme: 'dark', toggle: () => {}, isExplicit: false });

const systemTheme = () =>
  window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

/* The inline script in index.html has already stamped data-theme on <html>
   before first paint, so read from there rather than recomputing — that is
   what keeps the first render from flashing the wrong palette. */
const initialTheme = () => {
  const stamped = document.documentElement.dataset.theme;
  return stamped === 'light' || stamped === 'dark' ? stamped : systemTheme();
};

const readStored = () => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;   /* private mode / storage blocked */
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme);
  /* true once the visitor has picked a side; until then we follow the OS */
  const [isExplicit, setIsExplicit] = useState(() => readStored() !== null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    /* keeps the mobile browser chrome in step with the page */
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#F7F8FC' : '#060612');
  }, [theme]);

  /* Follow the OS until the visitor overrides it. After that, their choice wins. */
  useEffect(() => {
    if (isExplicit) return;
    const mq = window.matchMedia?.('(prefers-color-scheme: light)');
    if (!mq) return;
    const onChange = (e) => setTheme(e.matches ? 'light' : 'dark');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [isExplicit]);

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(STORAGE_KEY, next); } catch { /* non-fatal */ }
      return next;
    });
    setIsExplicit(true);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle, isExplicit }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
