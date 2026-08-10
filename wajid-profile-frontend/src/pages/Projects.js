import React from 'react';
import { useFetch } from '../hooks/useFetch';
import SectionStatus from '../components/SectionStatus';
import PlanetSystem from '../components/PlanetSystem';

export default function Projects() {
  const { data: projects, loading, error } = useFetch('/api/projects?kind=company', []);

  return (
    <section id="projects" className="space-section">
      <p className="section-label">Projects</p>
      <h2 className="section-heading">My Planet System</h2>
      <div className="section-divider" />
      <p className="about-text" style={{ marginBottom: '2rem', maxWidth: 580 }}>
        Each planet represents a real project I shipped at work. Click any planet to reveal its full story — tech stack, description, and company.
      </p>
      <SectionStatus loading={loading} error={error} empty={!projects.length} />

      <PlanetSystem projects={projects} variant="company" label="PROJECT" />
    </section>
  );
}
