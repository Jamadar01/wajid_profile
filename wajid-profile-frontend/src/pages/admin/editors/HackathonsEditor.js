import React, { useEffect, useState } from 'react';
import { api } from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import { Field, Textarea, SaveBtn, StatusMsg, ItemCard, FormCard, AddBtn } from './shared';

const blank = { rank: '', name: '', org: '', desc: '', badges: '', color: '#FCD34D', glow: '', emoji: '🏆', orbitDur: '10s', order: 0 };

function badgesToStr(badges) {
  return (badges || []).map(b => `${b.label}|${b.cls}`).join('\n');
}
function strToBadges(str) {
  return str.split('\n').filter(Boolean).map(row => {
    const [label, cls] = row.split('|');
    return { label: label?.trim(), cls: cls?.trim() || 'blue' };
  });
}

export default function HackathonsEditor() {
  const { token } = useAuth();
  const [items, setItems]   = useState([]);
  const [form, setForm]     = useState(null);
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState('');

  const load = () => api.get('/api/hackathons').then(setItems);
  useEffect(() => { load(); }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const startEdit = (item) => {
    setEditId(item._id);
    setForm({ ...item, badges: badgesToStr(item.badges) });
  };

  const startAdd = () => { setEditId(null); setForm({ ...blank, order: items.length }); };

  const cancel = () => { setForm(null); setEditId(null); };

  const save = async () => {
    const body = { ...form, badges: strToBadges(form.badges), order: Number(form.order) };
    try {
      if (editId) await api.put(`/api/hackathons/${editId}`, body, token);
      else        await api.post('/api/hackathons', body, token);
      setStatus('Saved!'); setForm(null); setEditId(null); await load();
    } catch (e) { setStatus('Error: ' + e.message); }
    setTimeout(() => setStatus(''), 3000);
  };

  const del = async (id) => {
    if (!window.confirm('Delete this hackathon?')) return;
    try { await api.delete(`/api/hackathons/${id}`, token); await load(); }
    catch (e) { setStatus('Error: ' + e.message); }
  };

  return (
    <div>
      <h2 style={{ color: '#a78bfa', marginBottom: 24 }}>Hackathons</h2>
      <AddBtn onClick={startAdd} />

      {form && (
        <FormCard onCancel={cancel}>
          <h3 style={{ color: '#c4b5fd', marginBottom: 16, fontSize: 15 }}>
            {editId ? 'Edit Hackathon' : 'New Hackathon'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Field label="Rank / Label" value={form.rank} onChange={v => set('rank', v)} />
            <Field label="Emoji" value={form.emoji} onChange={v => set('emoji', v)} />
            <Field label="Color (hex)" value={form.color} onChange={v => set('color', v)} />
            <Field label="Glow (rgba)" value={form.glow} onChange={v => set('glow', v)} />
            <Field label="Orbit Duration" value={form.orbitDur} onChange={v => set('orbitDur', v)} />
            <Field label="Order" value={String(form.order)} onChange={v => set('order', v)} type="number" />
          </div>
          <Field label="Name" value={form.name} onChange={v => set('name', v)} />
          <Field label="Org · Date" value={form.org} onChange={v => set('org', v)} />
          <Textarea label="Description" value={form.desc} onChange={v => set('desc', v)} rows={3} />
          <Textarea label="Badges — format: LABEL|cls (one per line, cls: gold/blue/purple)" value={form.badges} onChange={v => set('badges', v)} rows={3} />
          <SaveBtn onClick={save} />
          <StatusMsg msg={status} />
        </FormCard>
      )}

      {items.sort((a, b) => a.order - b.order).map(item => (
        <ItemCard key={item._id} onEdit={() => startEdit(item)} onDelete={() => del(item._id)}>
          <span style={{ fontSize: 18, marginRight: 8 }}>{item.emoji}</span>
          <strong style={{ color: '#c4b5fd' }}>{item.name}</strong>
          <span style={{ color: '#fcd34d', marginLeft: 8 }}>[{item.rank}]</span>
          <br /><span style={{ color: '#6b7280', fontSize: 13 }}>{item.org}</span>
        </ItemCard>
      ))}
      {!form && <StatusMsg msg={status} />}
    </div>
  );
}
