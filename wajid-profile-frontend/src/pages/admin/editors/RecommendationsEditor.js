import React, { useEffect, useState } from 'react';
import { api } from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import { Field, Textarea, SaveBtn, StatusMsg, ItemCard, FormCard, AddBtn } from './shared';

const blank = { signal: '', quote: '', name: '', role: '', strength: 95, color: '#8B5CF6', order: 0 };

export default function RecommendationsEditor() {
  const { token } = useAuth();
  const [items, setItems]   = useState([]);
  const [form, setForm]     = useState(null);
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState('');

  const load = () => api.get('/api/recommendations').then(setItems);
  useEffect(() => { load(); }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const startEdit = (item) => { setEditId(item._id); setForm({ ...item }); };
  const startAdd  = () => { setEditId(null); setForm({ ...blank, order: items.length }); };
  const cancel    = () => { setForm(null); setEditId(null); };

  const save = async () => {
    const body = { ...form, strength: Number(form.strength), order: Number(form.order) };
    try {
      if (editId) await api.put(`/api/recommendations/${editId}`, body, token);
      else        await api.post('/api/recommendations', body, token);
      setStatus('Saved!'); setForm(null); setEditId(null); await load();
    } catch (e) { setStatus('Error: ' + e.message); }
    setTimeout(() => setStatus(''), 3000);
  };

  const del = async (id) => {
    if (!window.confirm('Delete this recommendation?')) return;
    try { await api.delete(`/api/recommendations/${id}`, token); await load(); }
    catch (e) { setStatus('Error: ' + e.message); }
  };

  return (
    <div>
      <h2 style={{ color: 'var(--purple)', marginBottom: 24 }}>Recommendations</h2>
      <AddBtn onClick={startAdd} />

      {form && (
        <FormCard onCancel={cancel}>
          <h3 style={{ color: 'var(--accent-soft)', marginBottom: 16, fontSize: 15 }}>
            {editId ? 'Edit Recommendation' : 'New Recommendation'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Field label="Signal ID (e.g. ALPHA-1)" value={form.signal} onChange={v => set('signal', v)} />
            <Field label="Color (hex)" value={form.color} onChange={v => set('color', v)} />
            <Field label="Strength (0-100)" value={String(form.strength)} onChange={v => set('strength', v)} type="number" />
            <Field label="Order" value={String(form.order)} onChange={v => set('order', v)} type="number" />
          </div>
          <Field label="Name" value={form.name} onChange={v => set('name', v)} />
          <Field label="Role & Company" value={form.role} onChange={v => set('role', v)} />
          <Textarea label="Quote" value={form.quote} onChange={v => set('quote', v)} rows={3} />
          <SaveBtn onClick={save} />
          <StatusMsg msg={status} />
        </FormCard>
      )}

      {items.sort((a, b) => a.order - b.order).map(item => (
        <ItemCard key={item._id} onEdit={() => startEdit(item)} onDelete={() => del(item._id)}>
          <strong style={{ color: 'var(--accent-soft)' }}>{item.name}</strong>
          <span style={{ color: 'var(--text-mid)', fontSize: 13 }}> — {item.role}</span>
          <br /><span style={{ color: 'var(--text-mid)', fontSize: 13, fontStyle: 'italic' }}>"{item.quote?.slice(0, 80)}…"</span>
        </ItemCard>
      ))}
      {!form && <StatusMsg msg={status} />}
    </div>
  );
}
