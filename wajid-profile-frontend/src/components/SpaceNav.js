import React, { useState, useEffect } from 'react';

const LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Hackathons', href: '#hackathons' },
  { label: 'Contact',    href: '#contact' },
];

export default function SpaceNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="space-nav" style={scrolled ? { borderBottomColor: 'rgba(139,92,246,0.2)' } : {}}>
      <a href="#hero" className="nav-logo">Wajid Jamadar</a>
      <div className="nav-links-bar">
        {LINKS.map(({ label, href }) => (
          <a key={label} href={href} className="nav-link">{label}</a>
        ))}
        <a
          href="https://drive.google.com/file/d/1QHDfvKdBQcL-6MtakP_QCbdcI1RIminJ/view?usp=drive_link"
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
          style={{ padding: '7px 18px', fontSize: '0.82rem', borderRadius: '6px' }}
        >
          Resume ↗
        </a>
      </div>
    </nav>
  );
}
