import React, { useEffect, useState } from 'react';
import { api } from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import { Field, Textarea, SaveBtn, StatusMsg } from './shared';

export default function ProfileEditor() {
  const { token } = useAuth();
  const [form, setForm] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.get('/api/profile').then(d => setForm({
      name:         d.name         || '',
      greeting:     d.greeting     || '',
      typedStrings: (d.typedStrings || []).join('\n'),
      description:  d.description  || '',
      resumeLink:   d.resumeLink   || '',
      profileImage: d.profileImage || '',
      email:        d.social?.email    || '',
      github:       d.social?.github   || '',
      linkedin:     d.social?.linkedin || '',
    }));
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const save = async () => {
    try {
      await api.put('/api/profile', {
        name:         form.name,
        greeting:     form.greeting,
        typedStrings: form.typedStrings.split('\n').map(s => s.trim()).filter(Boolean),
        description:  form.description,
        resumeLink:   form.resumeLink,
        profileImage: form.profileImage,
        social: { email: form.email, github: form.github, linkedin: form.linkedin },
      }, token);
      setStatus('Saved!');
    } catch (e) {
      setStatus('Error: ' + e.message);
    }
    setTimeout(() => setStatus(''), 3000);
  };

  if (!form) return <p style={{ color: '#9ca3af' }}>Loading…</p>;

  return (
    <div>
      <h2 style={{ color: '#a78bfa', marginBottom: 24 }}>Profile</h2>
      <Field label="Name" value={form.name} onChange={v => set('name', v)} />
      <Field label="Greeting" value={form.greeting} onChange={v => set('greeting', v)} />
      <Textarea label="Typed Strings (one per line)" value={form.typedStrings} onChange={v => set('typedStrings', v)} rows={4} />
      <Textarea label="Description" value={form.description} onChange={v => set('description', v)} rows={3} />
      <Field label="Resume Link" value={form.resumeLink} onChange={v => set('resumeLink', v)} />
      <Field label="Profile Image Path" value={form.profileImage} onChange={v => set('profileImage', v)} />
      <h3 style={{ color: '#9ca3af', marginBottom: 12, marginTop: 20, fontSize: 13, letterSpacing: 1 }}>SOCIAL LINKS</h3>
      <Field label="Email" value={form.email} onChange={v => set('email', v)} />
      <Field label="GitHub URL" value={form.github} onChange={v => set('github', v)} />
      <Field label="LinkedIn URL" value={form.linkedin} onChange={v => set('linkedin', v)} />
      <SaveBtn onClick={save} />
      <StatusMsg msg={status} />
    </div>
  );
}
