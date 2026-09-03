import React from 'react';
import { useFetch } from '../hooks/useFetch';
import SectionStatus from '../components/SectionStatus';

/* Name the destination when we recognise it — "View on Credly" tells a
   hiring manager what they are about to open; a bare "Verify" does not. */
function verifyLabel(url = '') {
  if (/credly\.com/i.test(url))           return 'View on Credly';
  if (/accredible\.com/i.test(url))       return 'View credential';
  if (/google|cloud\.google/i.test(url))  return 'Verify with Google Cloud';
  return 'Verify credential';
}

/* Portrait card, badge-first. Three pills is what fits on one row of a 288px
   tile, so show three when that is all there is, otherwise two plus a count —
   that keeps the "+N" inline instead of wrapping onto a lonely second row.
   The full skill list stays on the credential itself. */
const SKILL_ROW = 3;

function skillPreview(skills = []) {
  if (skills.length <= SKILL_ROW) return { shown: skills, extra: 0 };
  const shown = skills.slice(0, SKILL_ROW - 1);
  return { shown, extra: skills.length - shown.length };
}

function CertCard({ cert }) {
  const color = cert.color || '#38BDF8';
  const glow  = cert.glow  || `${color}55`;
  const isAchievement = cert.kind === 'achievement';

  const { shown, extra } = skillPreview(cert.skills);

  return (
    <article
      className="cert-card"
      style={{ borderColor: `${color}2E` }}
      title={cert.desc || undefined}
    >
      <div className="cert-glow" style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }} />

      <div
        className="cert-badge"
        style={{ borderColor: `${color}3D`, background: `${color}0F`, boxShadow: `0 0 26px ${color}1F` }}
      >
        {cert.badgeImage
          ? <img src={cert.badgeImage} alt={`${cert.name} badge`} className="cert-badge-img" />
          : <span className="cert-badge-emoji">{cert.emoji || '📜'}</span>}
      </div>

      <p className="cert-issuer" style={{ color }}>{cert.issuer}</p>

      <h3 className="cert-name">{cert.name}</h3>

      {isAchievement && <span className="cert-kind">Skill badge</span>}

      <p className="cert-dates">
        {cert.issued && <>Issued {cert.issued}</>}
        {cert.expires && <> · Expires {cert.expires}</>}
        {cert.issued && !cert.expires && <> · No expiry</>}
      </p>

      {cert.desc && <p className="cert-desc">{cert.desc}</p>}

      {!!shown.length && (
        <div className="cert-skills">
          {shown.map(s => (
            <span key={s} className="cert-skill" style={{ borderColor: `${color}33`, color }}>
              {s}
            </span>
          ))}
          {extra > 0 && <span className="cert-skill cert-skill-more">+{extra}</span>}
        </div>
      )}

      <div className="cert-footer">
        {cert.verifyUrl && (
          <a
            className="cert-verify"
            href={cert.verifyUrl}
            target="_blank"
            rel="noreferrer"
            style={{ borderColor: `${color}55`, color }}
          >
            ✓ {verifyLabel(cert.verifyUrl)} ↗
          </a>
        )}
        {cert.credentialId && (
          <span className="cert-credential" title={`Credential ID: ${cert.credentialId}`}>
            ID <code>{cert.credentialId}</code>
          </span>
        )}
      </div>
    </article>
  );
}

export default function Certifications() {
  const { data: certs, loading, error } = useFetch('/api/certifications', []);

  /* nothing added yet — hide rather than show an empty grid */
  if (!loading && !error && !certs.length) return null;

  return (
    <section id="certifications" className="space-section">
      <p className="section-label">Credentials</p>
      <h2 className="section-heading">Certifications</h2>
      <div className="section-divider" />
      <p className="about-text" style={{ marginBottom: '2rem', maxWidth: 580 }}>
        Formal credentials, with the issuer and date on each — and a verification link
        where the issuer provides one.
      </p>
      <SectionStatus loading={loading} error={error} empty={false} />

      <div className="cert-grid">
        {certs.map(c => <CertCard key={c._id} cert={c} />)}
      </div>
    </section>
  );
}
