import React, { useEffect, useState } from 'react';
import { api } from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import { Field, Select, Textarea, SaveBtn, StatusMsg, ItemCard, FormCard, AddBtn } from './shared';

const blank = { name: '', kind: 'company', emoji: '🚀', color: '#7C3AED', glow: '', highlight: '', ring: false, size: 72, tech: '', company: '', desc: '', problem: '', solution: '', result: '', liveUrl: '', repoUrl: '', order: 0 };

const KINDS = [
  { value: 'company',  label: 'Company / Client work' },
  { value: 'personal', label: 'Personal — side project' },
];

/* docs created before `kind` existed have no value; treat them as company work */
const kindOf = (item) => (item.kind === 'personal' ? 'personal' : 'company');

export default function ProjectsEditor() {
  const { token } = useAuth();
  const [items, setItems]   = useState([]);
  const [form, setForm]     = useState(null);
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState('');
  const [tab, setTab]       = useState('company');

  const load = () => api.get('/api/projects').then(setItems);
  useEffect(() => { load(); }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const startEdit = (item) => {
    setEditId(item._id);
    setForm({ ...item, kind: kindOf(item), tech: (item.tech || []).join(', ') });
  };

  /* new entries default to whichever list you are looking at */
  const startAdd = () => {
    setEditId(null);
    setForm({ ...blank, kind: tab, order: items.filter(i => kindOf(i) === tab).length });
  };

  const cancel = () => { setForm(null); setEditId(null); };

  const save = async () => {
    const body = {
      ...form,
      company: form.kind === 'personal' ? '' : form.company,
      tech: form.tech.split(',').map(s => s.trim()).filter(Boolean),
      size: Number(form.size),
      order: Number(form.order),
      ring: Boolean(form.ring),
    };
    try {
      if (editId) await api.put(`/api/projects/${editId}`, body, token);
      else        await api.post('/api/projects', body, token);
      setStatus('Saved!'); setForm(null); setEditId(null); await load();
    } catch (e) { setStatus('Error: ' + e.message); }
    setTimeout(() => setStatus(''), 3000);
  };

  const del = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try { await api.delete(`/api/projects/${id}`, token); await load(); }
    catch (e) { setStatus('Error: ' + e.message); }
  };

  return (
    <div>
      <h2 style={{ color: '#a78bfa', marginBottom: 20 }}>Projects</h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {KINDS.map(k => {
          const active = tab === k.value;
          const count  = items.filter(i => kindOf(i) === k.value).length;
          return (
            <button key={k.value} onClick={() => setTab(k.value)} style={{
              background: active ? 'rgba(167,139,250,0.15)' : 'transparent',
              border: `1px solid ${active ? 'rgba(167,139,250,0.4)' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: 8, padding: '7px 16px', fontSize: 13, cursor: 'pointer',
              color: active ? '#c4b5fd' : '#9ca3af',
            }}>
              {k.value === 'personal' ? 'Personal' : 'Company'} ({count})
            </button>
          );
        })}
      </div>

      <AddBtn onClick={startAdd} />

      {form && (
        <FormCard onCancel={cancel}>
          <h3 style={{ color: '#c4b5fd', marginBottom: 16, fontSize: 15 }}>
            {editId ? 'Edit Project' : 'New Project'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Field label="Name" value={form.name} onChange={v => set('name', v)} />
            <Select label="Type" value={form.kind} onChange={v => set('kind', v)} options={KINDS} />
            <Field label="Emoji" value={form.emoji} onChange={v => set('emoji', v)} />
            <Field label="Color (hex)" value={form.color} onChange={v => set('color', v)} />
            <Field label="Glow (rgba)" value={form.glow} onChange={v => set('glow', v)} />
            <Field label="Highlight (rgba)" value={form.highlight} onChange={v => set('highlight', v)} />
            <Field label="Size (px)" value={String(form.size)} onChange={v => set('size', v)} type="number" />
            {form.kind !== 'personal' && (
              <Field label="Company" value={form.company} onChange={v => set('company', v)} />
            )}
            <Field label="Order" value={String(form.order)} onChange={v => set('order', v)} type="number" />
          </div>
          <Field label="Tech (comma-separated)" value={form.tech} onChange={v => set('tech', v)} />
          <Textarea label="Description" value={form.desc} onChange={v => set('desc', v)} rows={3} />
          <Textarea label="Case Study — The Problem" value={form.problem || ''} onChange={v => set('problem', v)} rows={2} />
          <Textarea label="Case Study — What I Built" value={form.solution || ''} onChange={v => set('solution', v)} rows={2} />
          <Textarea label="Case Study — The Result" value={form.result || ''} onChange={v => set('result', v)} rows={2} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Field label="Live URL" value={form.liveUrl || ''} onChange={v => set('liveUrl', v)} />
            <Field label="Repo URL" value={form.repoUrl || ''} onChange={v => set('repoUrl', v)} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <label style={{ color: '#9ca3af', fontSize: 12, letterSpacing: 1 }}>RING</label>
            <input type="checkbox" checked={Boolean(form.ring)}
              onChange={e => set('ring', e.target.checked)}
              style={{ width: 16, height: 16 }} />
          </div>
          <SaveBtn onClick={save} />
          <StatusMsg msg={status} />
        </FormCard>
      )}

      {items
        .filter(item => kindOf(item) === tab)
        .sort((a, b) => a.order - b.order)
        .map(item => (
          <ItemCard key={item._id} onEdit={() => startEdit(item)} onDelete={() => del(item._id)}>
            <span style={{ fontSize: 18, marginRight: 8 }}>{item.emoji}</span>
            <strong style={{ color: '#c4b5fd' }}>{item.name}</strong>
            <br />
            <span style={{ color: '#6b7280', fontSize: 13 }}>
              {tab === 'personal'
                ? [item.liveUrl && 'Live', item.repoUrl && 'Repo'].filter(Boolean).join(' + ') || 'no links'
                : item.company}
              {' · '}{(item.tech || []).join(', ')}
            </span>
          </ItemCard>
        ))}
      {!form && <StatusMsg msg={status} />}
    </div>
  );
}
