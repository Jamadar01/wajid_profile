import React, { useEffect } from 'react';
import './App.css';
import StarField   from './components/StarField';
import NebulaOrbs  from './components/NebulaOrbs';
import SpaceNav    from './components/SpaceNav';
import Hero        from './pages/Hero';
import About       from './pages/About';
import Experience  from './pages/Experience';
import Projects    from './pages/Projects';
import SkillMap    from './pages/SkillMap';
import Hackathons  from './pages/Hackathons';
import Recommendations from './components/Recommendations';

export default function App() {
  /* 2-D mouse parallax — CSS custom properties, no re-renders */
  useEffect(() => {
    let mx = 0, my = 0, cx = 0, cy = 0, raf;
    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const tick = () => {
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;
      document.documentElement.style.setProperty('--px', cx);
      document.documentElement.style.setProperty('--py', cy);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <StarField />
      <NebulaOrbs />
      <SpaceNav />
      <main className="page-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <SkillMap />
        <Hackathons />
        <section className="space-section" id="testimonials">
          <p className="section-label">Testimonials</p>
          <h2 className="section-heading">What People Say</h2>
          <div className="section-divider" />
          <Recommendations />
        </section>
        <footer className="space-footer">
          Built with ♥ by <a href="https://github.com/Jamadar01" target="_blank" rel="noreferrer">Wajid Jamadar</a> · 2025
        </footer>
      </main>
    </>
  );
}
