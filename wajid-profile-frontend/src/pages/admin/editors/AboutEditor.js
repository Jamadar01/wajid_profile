import React, { useEffect, useState } from 'react';
import { api } from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import { Field, Textarea, SaveBtn, StatusMsg } from './shared';

const blank = {
  bio:       '',
  hobbies:   '',
  school: '', degree: '', period: '', cgpa: '', location: '',
  chips:     '',
  extras:    '',
};

function toForm(d) {
  return {
    bio:      (d.bio || []).join('\n\n'),
    hobbies:  (d.hobbies || []).join(', '),
    school:   d.education?.school   || '',
    degree:   d.education?.degree   || '',
    period:   d.education?.period   || '',
    cgpa:     d.education?.cgpa     || '',
    location: d.education?.location || '',
    chips:    (d.statusChips || []).map(c => `${c.label}|${c.value}|${c.color}`).join('\n'),
    extras:   (d.extracurriculars || []).map(e => `${e.role}|${e.org}|${e.desc}`).join('\n'),
  };
}

export default function AboutEditor() {
  const { token } = useAuth();
  const [form, setForm]     = useState(blank);
  const [status, setStatus] = useState('');

  useEffect(() => { api.get('/api/about').then(d => setForm(toForm(d))); }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const save = async () => {
    try {
      await api.put('/api/about', {
        bio:          form.bio.split('\n\n').map(s => s.trim()).filter(Boolean),
        hobbies:      form.hobbies.split(',').map(s => s.trim()).filter(Boolean),
        education:    { school: form.school, degree: form.degree, period: form.period, cgpa: form.cgpa, location: form.location },
        statusChips:  form.chips.split('\n').filter(Boolean).map(row => {
          const [label, value, color] = row.split('|');
          return { label: label?.trim(), value: value?.trim(), color: color?.trim() };
        }),
        extracurriculars: form.extras.split('\n').filter(Boolean).map(row => {
          const [role, org, desc] = row.split('|');
          return { role: role?.trim(), org: org?.trim(), desc: desc?.trim() };
        }),
      }, token);
      setStatus('Saved!');
    } catch (e) { setStatus('Error: ' + e.message); }
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <div>
      <h2 style={{ color: 'var(--purple)', marginBottom: 24 }}>About</h2>

      <h3 style={{ color: 'var(--text-mid)', fontSize: 12, letterSpacing: 1, marginBottom: 12 }}>STATUS CHIPS — format: LABEL|VALUE|#COLOR (one per line)</h3>
      <Textarea label="" value={form.chips} onChange={v => set('chips', v)} rows={4} />

      <Textarea label="Bio paragraphs (blank line between each)" value={form.bio} onChange={v => set('bio', v)} rows={6} />

      <Field label="Hobbies (comma-separated)" value={form.hobbies} onChange={v => set('hobbies', v)} />

      <h3 style={{ color: 'var(--text-mid)', fontSize: 12, letterSpacing: 1, marginBottom: 12, marginTop: 8 }}>EDUCATION</h3>
      <Field label="School" value={form.school} onChange={v => set('school', v)} />
      <Field label="Degree" value={form.degree} onChange={v => set('degree', v)} />
      <Field label="Period" value={form.period} onChange={v => set('period', v)} />
      <Field label="CGPA" value={form.cgpa} onChange={v => set('cgpa', v)} />
      <Field label="Location" value={form.location} onChange={v => set('location', v)} />

      <h3 style={{ color: 'var(--text-mid)', fontSize: 12, letterSpacing: 1, marginBottom: 12, marginTop: 8 }}>EXTRA-CURRICULARS — format: ROLE|ORG|DESC (one per line)</h3>
      <Textarea label="" value={form.extras} onChange={v => set('extras', v)} rows={4} />

      <SaveBtn onClick={save} />
      <StatusMsg msg={status} />
    </div>
  );
}
