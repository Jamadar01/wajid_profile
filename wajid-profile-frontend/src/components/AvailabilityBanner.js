import React from 'react';
import { useFetch } from '../hooks/useFetch';

/* Open-to-work banner, driven entirely by profile.availability.
   Renders nothing while loading, on error, or when `open` is false —
   an empty or stale "hire me" banner is worse than none. */
export default function AvailabilityBanner() {
  const { data: profile, loading, error } = useFetch('/api/profile');
  const a = profile?.availability;

  if (loading || error || !a || a.open === false) return null;
  if (!a.headline && !(a.roles || []).length) return null;

  const meta = [
    ['Looking for', (a.types || []).join(' · ')],
    ['Location',    (a.locations || []).join(' · ')],
    ['Available',   a.startDate],
  ].filter(([, value]) => value);

  return (
    <section id="availability" className="avail-section">
      <div className="avail-card">
        <div className="avail-glow" aria-hidden="true" />

        <div className="avail-top">
          <span className="avail-pill">
            <span className="avail-pulse" />
            {a.status || 'Open to opportunities'}
          </span>
        </div>

        <h2 className="avail-headline">{a.headline}</h2>

        {a.blurb && <p className="avail-blurb">{a.blurb}</p>}

        {!!(a.roles || []).length && (
          <div className="avail-roles-block">
            <p className="avail-label">Roles I&apos;m targeting</p>
            <div className="avail-roles">
              {a.roles.map(r => (
                <span key={r} className="avail-role">{r}</span>
              ))}
            </div>
          </div>
        )}

        {!!meta.length && (
          <div className="avail-meta">
            {meta.map(([label, value]) => (
              <div className="avail-meta-item" key={label}>
                <span className="avail-label">{label}</span>
                <span className="avail-meta-value">{value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="avail-actions">
          <a href={a.ctaUrl || '#contact'} className="btn-primary">
            {a.ctaLabel || 'Get in touch'}
          </a>
          {profile?.resumeLink && (
            <a href={profile.resumeLink} target="_blank" rel="noreferrer" className="btn-ghost">
              Download Resume ↗
            </a>
          )}
          {profile?.social?.linkedin && (
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
              LinkedIn ↗
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
