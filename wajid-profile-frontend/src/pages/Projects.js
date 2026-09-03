import React from 'react';
import { useFetch } from '../hooks/useFetch';
import SectionStatus from '../components/SectionStatus';
import PlanetSystem from '../components/PlanetSystem';

/* The planet system is personal work only — projects built at a company
   live inside that company's mission log instead. */
export default function Projects() {
  const { data: projects, loading, error } = useFetch('/api/projects?kind=personal', []);

  return (
    <section id="projects" className="space-section">
      <p className="section-label">Projects</p>
      <h2 className="section-heading">My Planet System</h2>
      <div className="section-divider" />
      <p className="about-text" style={{ marginBottom: '2rem', maxWidth: 620 }}>
        Everything here I built on my own time — no client, no brief. Click a planet for the
        full story: the problem, what I built, how it is put together, and where to try it.
        Work I shipped at a company lives in that company&apos;s{' '}
        <a href="#experience" className="inline-link">mission log</a>.
      </p>
      <SectionStatus loading={loading} error={error} empty={!projects.length} />

      <PlanetSystem projects={projects} variant="personal" label="BUILD" />
    </section>
  );
}
