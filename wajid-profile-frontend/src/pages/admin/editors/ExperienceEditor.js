import React, { useEffect, useState } from 'react';
import { api } from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import { Field, Textarea, SaveBtn, StatusMsg, ItemCard, FormCard, AddBtn } from './shared';

const blank = {
  company: '', slug: '', role: '', duration: '', location: '', techStack: '',
  responsibilities: '', link: '', image: '', order: 0,
  summary: '', skillGroups: '', impact: '', color: '',
};

/* Skill groups are edited as one line per group: "Label: item, item, item".
   Round-trips to [{ label, items: [] }] so the mission page can render them
   as separate cards. */
const groupsToText = (groups = []) =>
  groups.map(g => `${g.label}: ${(g.items || []).join(', ')}`).join('\n');

const textToGroups = (text = '') =>
  text.split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const i = line.indexOf(':');
      if (i === -1) return { label: line, items: [] };
      return {
        label: line.slice(0, i).trim(),
        items: line.slice(i + 1).split(',').map(s => s.trim()).filter(Boolean),
      };
    })
    .filter(g => g.label);

const linesToArray = (text = '') =>
  text.split('\n').map(s => s.trim()).filter(Boolean);

export default function ExperienceEditor() {
  const { token } = useAuth();
  const [items, setItems]   = useState([]);
  const [form, setForm]     = useState(null);
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState('');

  const load = () => api.get('/api/experience').then(setItems);
  useEffect(() => { load(); }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const startEdit = (item) => {
    setEditId(item._id);
    setForm({
      ...blank,
      ...item,
      responsibilities: (item.responsibilities || []).join('\n'),
      impact:           (item.impact || []).join('\n'),
      skillGroups:      groupsToText(item.skillGroups),
    });
  };

  const startAdd = () => { setEditId(null); setForm({ ...blank, order: items.length }); };

  const cancel = () => { setForm(null); setEditId(null); };

  const save = async () => {
    const body = {
      ...form,
      responsibilities: linesToArray(form.responsibilities),
      impact:           linesToArray(form.impact),
      skillGroups:      textToGroups(form.skillGroups),
      order:            Number(form.order),
    };
    /* let the server derive the slug from the company name when blank */
    if (!body.slug.trim()) delete body.slug;

    try {
      if (editId) await api.put(`/api/experience/${editId}`, body, token);
      else        await api.post('/api/experience', body, token);
      setStatus('Saved!'); setForm(null); setEditId(null); await load();
    } catch (e) { setStatus('Error: ' + e.message); }
    setTimeout(() => setStatus(''), 3000);
  };

  const del = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    try { await api.delete(`/api/experience/${id}`, token); await load(); }
    catch (e) { setStatus('Error: ' + e.message); }
  };

  return (
    <div>
      <h2 style={{ color: '#a78bfa', marginBottom: 8 }}>Experience</h2>
      <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 20 }}>
        Each entry is a mission with its own page at <code>/mission/&lt;slug&gt;</code>.
        Summary, skill groups and impact appear there only — the homepage card ignores them.
      </p>
      <AddBtn onClick={startAdd} />

      {form && (
        <FormCard onCancel={cancel}>
          <h3 style={{ color: '#c4b5fd', marginBottom: 16, fontSize: 15 }}>
            {editId ? 'Edit Entry' : 'New Entry'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Field label="Company" value={form.company} onChange={v => set('company', v)} />
            <Field label="Slug (blank = from company name)" value={form.slug || ''} onChange={v => set('slug', v)} />
            <Field label="Role" value={form.role} onChange={v => set('role', v)} />
            <Field label="Duration" value={form.duration} onChange={v => set('duration', v)} />
            <Field label="Location" value={form.location} onChange={v => set('location', v)} />
            <Field label="Mission Color (hex)" value={form.color || ''} onChange={v => set('color', v)} />
            <Field label="Link" value={form.link} onChange={v => set('link', v)} />
            <Field label="Image Path" value={form.image} onChange={v => set('image', v)} />
          </div>

          <Field label="Tech Stack (shown on the homepage card)" value={form.techStack} onChange={v => set('techStack', v)} />
          <Textarea label="Responsibilities (one per line)" value={form.responsibilities} onChange={v => set('responsibilities', v)} rows={4} />

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '8px 0 18px' }} />
          <p style={{ color: '#a78bfa', fontSize: 12, letterSpacing: 1, marginBottom: 14 }}>
            MISSION PAGE ONLY
          </p>

          <Textarea label="Summary (intro paragraph on the mission page)" value={form.summary || ''} onChange={v => set('summary', v)} rows={3} />
          <Textarea
            label='Skills Deployed — one group per line, "Label: item, item"'
            value={form.skillGroups || ''}
            onChange={v => set('skillGroups', v)}
            rows={6}
          />
          <Textarea label="Impact (one per line, optional)" value={form.impact || ''} onChange={v => set('impact', v)} rows={3} />

          <Field label="Order" value={String(form.order)} onChange={v => set('order', v)} type="number" />
          <SaveBtn onClick={save} />
          <StatusMsg msg={status} />
        </FormCard>
      )}

      {items.slice().sort((a, b) => a.order - b.order).map(item => (
        <ItemCard key={item._id} onEdit={() => startEdit(item)} onDelete={() => del(item._id)}>
          <strong style={{ color: '#c4b5fd' }}>{item.company}</strong> — {item.role}
          <br /><span style={{ color: '#6b7280', fontSize: 13 }}>
            {item.duration} · {item.location}
          </span>
          <br /><span style={{ color: '#4b5563', fontSize: 12 }}>
            /mission/{item.slug || item._id}
            {' · '}{(item.skillGroups || []).length} skill groups
          </span>
        </ItemCard>
      ))}
      {!form && <StatusMsg msg={status} />}
    </div>
  );
}
