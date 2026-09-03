import React, { useEffect, useState } from 'react';
import { api } from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import { Field, Select, Textarea, SaveBtn, StatusMsg, ItemCard, FormCard, AddBtn } from './shared';

const blank = {
  name: '', slug: '', kind: 'company', emoji: '🚀', color: '#7C3AED', glow: '', highlight: '',
  ring: false, size: 72, tech: '', company: '', experience: '', role: '', timeline: '',
  desc: '', problem: '', solution: '', result: '', architecture: '', highlights: '',
  draft: false, liveUrl: '', repoUrl: '', order: 0,
};

const KINDS = [
  { value: 'company',  label: 'Company / Client work' },
  { value: 'personal', label: 'Personal — side project' },
];

/* docs created before `kind` existed have no value; treat them as company work */
const kindOf = (item) => (item.kind === 'personal' ? 'personal' : 'company');

/* Architecture layers are edited as one line per layer:
   "Layer | tech, tech | note".  Round-trips to
   [{ layer, tech: [], note }] for the diagram on the detail page. */
const archToText = (layers = []) =>
  layers.map(l => [l.layer, (l.tech || []).join(', '), l.note || ''].join(' | ')).join('\n');

const textToArch = (text = '') =>
  text.split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const [layer = '', tech = '', ...rest] = line.split('|');
      return {
        layer: layer.trim(),
        tech:  tech.split(',').map(s => s.trim()).filter(Boolean),
        note:  rest.join('|').trim(),
      };
    })
    .filter(l => l.layer);

const linesToArray = (text = '') =>
  text.split('\n').map(s => s.trim()).filter(Boolean);

export default function ProjectsEditor() {
  const { token } = useAuth();
  const [items, setItems]     = useState([]);
  const [missions, setMissions] = useState([]);
  const [form, setForm]       = useState(null);
  const [editId, setEditId]   = useState(null);
  const [status, setStatus]   = useState('');
  const [tab, setTab]         = useState('company');

  const load = () => api.get('/api/projects').then(setItems);

  useEffect(() => {
    load();
    api.get('/api/experience').then(setMissions).catch(() => setMissions([]));
  }, []);

  const missionOptions = [
    { value: '', label: '— not linked to a mission —' },
    ...missions.map(m => ({ value: m._id, label: `${m.company} (${m.duration})` })),
  ];

  const missionName = (id) => missions.find(m => m._id === id)?.company;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const startEdit = (item) => {
    setEditId(item._id);
    setForm({
      ...blank,
      ...item,
      kind:         kindOf(item),
      tech:         (item.tech || []).join(', '),
      experience:   item.experience || '',
      architecture: archToText(item.architecture),
      highlights:   (item.highlights || []).join('\n'),
    });
  };

  /* new entries default to whichever list you are looking at */
  const startAdd = () => {
    setEditId(null);
    setForm({ ...blank, kind: tab, order: items.filter(i => kindOf(i) === tab).length });
  };

  const cancel = () => { setForm(null); setEditId(null); };

  /* Picking a mission fills the company name from it, so the two cannot drift */
  const pickMission = (id) => {
    setForm(f => ({ ...f, experience: id, company: missionName(id) || f.company }));
  };

  const save = async () => {
    const personal = form.kind === 'personal';
    const body = {
      ...form,
      company:      personal ? '' : form.company,
      experience:   personal ? null : (form.experience || null),
      tech:         form.tech.split(',').map(s => s.trim()).filter(Boolean),
      architecture: textToArch(form.architecture),
      highlights:   linesToArray(form.highlights),
      size:         Number(form.size),
      order:        Number(form.order),
      ring:         Boolean(form.ring),
      draft:        Boolean(form.draft),
    };
    if (!String(body.slug || '').trim()) delete body.slug;

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

  const draftCount = items.filter(i => i.draft && kindOf(i) === tab).length;

  return (
    <div>
      <h2 style={{ color: '#a78bfa', marginBottom: 8 }}>Projects</h2>
      <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 20 }}>
        <strong style={{ color: '#9ca3af' }}>Personal</strong> projects fill the planet system
        on the homepage. <strong style={{ color: '#9ca3af' }}>Company</strong> projects appear on
        their mission page — link each one to a mission below.
      </p>

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

      {!!draftCount && (
        <div style={{
          background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)',
          borderRadius: 8, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#fbbf24',
        }}>
          {draftCount} {draftCount === 1 ? 'project is' : 'projects are'} still marked DRAFT — the
          public page labels them as such. Fill in Problem / What I Built / Result and the
          architecture notes, then untick DRAFT.
        </div>
      )}

      <AddBtn onClick={startAdd} />

      {form && (
        <FormCard onCancel={cancel}>
          <h3 style={{ color: '#c4b5fd', marginBottom: 16, fontSize: 15 }}>
            {editId ? 'Edit Project' : 'New Project'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Field label="Name" value={form.name} onChange={v => set('name', v)} />
            <Field label="Slug (blank = from name)" value={form.slug || ''} onChange={v => set('slug', v)} />
            <Select label="Type" value={form.kind} onChange={v => set('kind', v)} options={KINDS} />
            <Field label="Emoji" value={form.emoji} onChange={v => set('emoji', v)} />
            <Field label="Color (hex)" value={form.color} onChange={v => set('color', v)} />
            <Field label="Glow (rgba)" value={form.glow || ''} onChange={v => set('glow', v)} />
            <Field label="Highlight (rgba)" value={form.highlight || ''} onChange={v => set('highlight', v)} />
            <Field label="Size (px)" value={String(form.size)} onChange={v => set('size', v)} type="number" />
            <Field label="Order" value={String(form.order)} onChange={v => set('order', v)} type="number" />
          </div>

          {form.kind !== 'personal' && (
            <>
              <Select
                label="Mission (which company this shipped at)"
                value={form.experience || ''}
                onChange={pickMission}
                options={missionOptions}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 16px' }}>
                <Field label="Company (display name)" value={form.company || ''} onChange={v => set('company', v)} />
                <Field label="My Role" value={form.role || ''} onChange={v => set('role', v)} />
                <Field label="Timeline" value={form.timeline || ''} onChange={v => set('timeline', v)} />
              </div>
            </>
          )}

          <Field label="Tech (comma-separated)" value={form.tech} onChange={v => set('tech', v)} />
          <Textarea label="Description" value={form.desc} onChange={v => set('desc', v)} rows={3} />
          <Textarea label="Case Study — The Problem" value={form.problem || ''} onChange={v => set('problem', v)} rows={2} />
          <Textarea label="Case Study — What I Built" value={form.solution || ''} onChange={v => set('solution', v)} rows={2} />
          <Textarea label="Case Study — The Result" value={form.result || ''} onChange={v => set('result', v)} rows={2} />
          <Textarea label="Highlights (one per line)" value={form.highlights || ''} onChange={v => set('highlights', v)} rows={3} />

          <Textarea
            label='Architecture — one layer per line: "Layer | tech, tech | note"'
            value={form.architecture || ''}
            onChange={v => set('architecture', v)}
            rows={7}
          />
          <p style={{ color: '#4b5563', fontSize: 12, marginTop: -10, marginBottom: 16 }}>
            Example: <code>API | Node.js, Express | Streams tokens back over SSE</code> — rendered
            top-to-bottom as a connected stack.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Field label="Live URL" value={form.liveUrl || ''} onChange={v => set('liveUrl', v)} />
            <Field label="Repo URL" value={form.repoUrl || ''} onChange={v => set('repoUrl', v)} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 16 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#9ca3af', fontSize: 12, letterSpacing: 1 }}>
              RING
              <input type="checkbox" checked={Boolean(form.ring)}
                onChange={e => set('ring', e.target.checked)}
                style={{ width: 16, height: 16 }} />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fbbf24', fontSize: 12, letterSpacing: 1 }}>
              DRAFT — details still to be written
              <input type="checkbox" checked={Boolean(form.draft)}
                onChange={e => set('draft', e.target.checked)}
                style={{ width: 16, height: 16 }} />
            </label>
          </div>

          <SaveBtn onClick={save} />
          <StatusMsg msg={status} />
        </FormCard>
      )}

      {items
        .filter(item => kindOf(item) === tab)
        .slice()
        .sort((a, b) => a.order - b.order)
        .map(item => (
          <ItemCard key={item._id} onEdit={() => startEdit(item)} onDelete={() => del(item._id)}>
            <span style={{ fontSize: 18, marginRight: 8 }}>{item.emoji}</span>
            <strong style={{ color: '#c4b5fd' }}>{item.name}</strong>
            {item.draft && (
              <span style={{
                marginLeft: 8, fontSize: 10, letterSpacing: 1.5, color: '#fbbf24',
                border: '1px solid rgba(251,191,36,0.3)', borderRadius: 20, padding: '2px 8px',
              }}>DRAFT</span>
            )}
            <br />
            <span style={{ color: '#6b7280', fontSize: 13 }}>
              {tab === 'personal'
                ? [item.liveUrl && 'Live', item.repoUrl && 'Repo'].filter(Boolean).join(' + ') || 'no links'
                : (missionName(item.experience) || item.company || 'no mission linked')}
              {' · '}{(item.tech || []).join(', ')}
            </span>
            <br />
            <span style={{ color: '#4b5563', fontSize: 12 }}>
              {(item.architecture || []).length} architecture layers
              {' · '}{(item.highlights || []).length} highlights
            </span>
          </ItemCard>
        ))}
      {!form && <StatusMsg msg={status} />}
    </div>
  );
}
