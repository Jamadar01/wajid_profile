import React from 'react';
import { useFetch } from '../hooks/useFetch';
import SectionStatus from '../components/SectionStatus';
import PlanetSystem from '../components/PlanetSystem';

export default function PersonalProjects() {
  const { data: projects, loading, error } = useFetch('/api/projects?kind=personal', []);

  /* nothing seeded yet — hide the section rather than show an empty grid */
  if (!loading && !error && !projects.length) return null;

  return (
    <section id="personal-projects" className="space-section">
      <p className="section-label">Personal</p>
      <h2 className="section-heading">Built On My Own Time</h2>
      <div className="section-divider" />
      <p className="about-text" style={{ marginBottom: '2rem', maxWidth: 580 }}>
        Side projects I built for myself — no client, no brief. Every one is live to try or open to read.
      </p>
      <SectionStatus loading={loading} error={error} empty={false} />

      <PlanetSystem projects={projects} variant="personal" label="BUILD" />
    </section>
  );
}
