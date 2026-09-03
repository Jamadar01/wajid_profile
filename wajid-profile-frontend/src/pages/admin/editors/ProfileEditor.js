import React, { useEffect, useState } from 'react';
import { api } from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import { Field, Textarea, SaveBtn, StatusMsg } from './shared';

const linesToArray = (text = '') =>
  text.split('\n').map(s => s.trim()).filter(Boolean);

const commaToArray = (text = '') =>
  text.split(',').map(s => s.trim()).filter(Boolean);

export default function ProfileEditor() {
  const { token } = useAuth();
  const [form, setForm] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.get('/api/profile').then(d => {
      const a = d.availability || {};
      setForm({
        name:         d.name         || '',
        greeting:     d.greeting     || '',
        typedStrings: (d.typedStrings || []).join('\n'),
        description:  d.description  || '',
        resumeLink:   d.resumeLink   || '',
        profileImage: d.profileImage || '',
        email:        d.social?.email    || '',
        github:       d.social?.github   || '',
        linkedin:     d.social?.linkedin || '',

        availOpen:        a.open !== false,
        availStatus:      a.status      || '',
        availClosedLabel: a.closedLabel || '',
        availHeadline:    a.headline    || '',
        availBlurb:       a.blurb       || '',
        availRoles:       (a.roles     || []).join('\n'),
        availTypes:       (a.types     || []).join(', '),
        availLocations:   (a.locations || []).join(', '),
        availStartDate:   a.startDate || '',
        availCtaLabel:    a.ctaLabel  || '',
        availCtaUrl:      a.ctaUrl    || '',
      });
    });
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const save = async () => {
    try {
      await api.put('/api/profile', {
        name:         form.name,
        greeting:     form.greeting,
        typedStrings: linesToArray(form.typedStrings),
        description:  form.description,
        resumeLink:   form.resumeLink,
        profileImage: form.profileImage,
        social: { email: form.email, github: form.github, linkedin: form.linkedin },
        availability: {
          open:        Boolean(form.availOpen),
          status:      form.availStatus,
          closedLabel: form.availClosedLabel,
          headline:    form.availHeadline,
          blurb:       form.availBlurb,
          roles:       linesToArray(form.availRoles),
          types:       commaToArray(form.availTypes),
          locations:   commaToArray(form.availLocations),
          startDate:   form.availStartDate,
          ctaLabel:    form.availCtaLabel,
          ctaUrl:      form.availCtaUrl,
        },
      }, token);
      setStatus('Saved!');
    } catch (e) {
      setStatus('Error: ' + e.message);
    }
    setTimeout(() => setStatus(''), 3000);
  };

  if (!form) return <p style={{ color: '#9ca3af' }}>Loading…</p>;

  const sectionHeading = { color: '#a78bfa', marginBottom: 12, marginTop: 28, fontSize: 13, letterSpacing: 1 };

  return (
    <div>
      <h2 style={{ color: '#a78bfa', marginBottom: 24 }}>Profile</h2>
      <Field label="Name" value={form.name} onChange={v => set('name', v)} />
      <Field label="Greeting" value={form.greeting} onChange={v => set('greeting', v)} />
      <Textarea label="Typed Strings (one per line)" value={form.typedStrings} onChange={v => set('typedStrings', v)} rows={4} />
      <Textarea label="Description" value={form.description} onChange={v => set('description', v)} rows={3} />
      <Field label="Resume Link" value={form.resumeLink} onChange={v => set('resumeLink', v)} />
      <Field label="Profile Image Path" value={form.profileImage} onChange={v => set('profileImage', v)} />

      <h3 style={{ ...sectionHeading, color: '#9ca3af' }}>SOCIAL LINKS</h3>
      <Field label="Email" value={form.email} onChange={v => set('email', v)} />
      <Field label="GitHub URL" value={form.github} onChange={v => set('github', v)} />
      <Field label="LinkedIn URL" value={form.linkedin} onChange={v => set('linkedin', v)} />

      <h3 style={sectionHeading}>OPEN TO WORK BANNER</h3>
      <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 16 }}>
        Drives the banner under the hero and the status pill inside it. Untick{' '}
        <strong style={{ color: '#9ca3af' }}>Open to work</strong> to hide the banner completely —
        the pill then shows the closed label instead.
      </p>

      <label style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
        color: form.availOpen ? '#34d399' : '#9ca3af', fontSize: 13, letterSpacing: 1,
      }}>
        <input
          type="checkbox"
          checked={Boolean(form.availOpen)}
          onChange={e => set('availOpen', e.target.checked)}
          style={{ width: 16, height: 16 }}
        />
        OPEN TO WORK — {form.availOpen ? 'banner is visible' : 'banner is hidden'}
      </label>

      <Field label="Status pill (short)" value={form.availStatus} onChange={v => set('availStatus', v)} />
      <Field label="Closed label (pill text when not looking)" value={form.availClosedLabel} onChange={v => set('availClosedLabel', v)} />
      <Field label="Banner headline" value={form.availHeadline} onChange={v => set('availHeadline', v)} />
      <Textarea label="Banner blurb" value={form.availBlurb} onChange={v => set('availBlurb', v)} rows={3} />
      <Textarea label="Target roles (one per line)" value={form.availRoles} onChange={v => set('availRoles', v)} rows={4} />
      <Field label="Employment types (comma-separated)" value={form.availTypes} onChange={v => set('availTypes', v)} />
      <Field label="Locations (comma-separated)" value={form.availLocations} onChange={v => set('availLocations', v)} />
      <Field label="Available from / notice period (blank hides the row)" value={form.availStartDate} onChange={v => set('availStartDate', v)} />
      <Field label="CTA label" value={form.availCtaLabel} onChange={v => set('availCtaLabel', v)} />
      <Field label="CTA URL (e.g. #contact)" value={form.availCtaUrl} onChange={v => set('availCtaUrl', v)} />

      <SaveBtn onClick={save} />
      <StatusMsg msg={status} />
    </div>
  );
}
