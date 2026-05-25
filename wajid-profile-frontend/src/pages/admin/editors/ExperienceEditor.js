import React, { useEffect, useState } from 'react';
import { api } from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import { Field, Textarea, SaveBtn, StatusMsg, ItemCard, FormCard, AddBtn } from './shared';

const blank = { company: '', role: '', duration: '', location: '', techStack: '', responsibilities: '', link: '', image: '', order: 0 };

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
    setForm({ ...item, responsibilities: (item.responsibilities || []).join('\n') });
  };

  const startAdd = () => { setEditId(null); setForm({ ...blank, order: items.length }); };

  const cancel = () => { setForm(null); setEditId(null); };

  const save = async () => {
    const body = {
      ...form,
      responsibilities: form.responsibilities.split('\n').map(s => s.trim()).filter(Boolean),
      order: Number(form.order),
    };
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
      <h2 style={{ color: '#a78bfa', marginBottom: 24 }}>Experience</h2>
      <AddBtn onClick={startAdd} />

      {form && (
        <FormCard onCancel={cancel}>
          <h3 style={{ color: '#c4b5fd', marginBottom: 16, fontSize: 15 }}>
            {editId ? 'Edit Entry' : 'New Entry'}
          </h3>
          <Field label="Company" value={form.company} onChange={v => set('company', v)} />
          <Field label="Role" value={form.role} onChange={v => set('role', v)} />
          <Field label="Duration" value={form.duration} onChange={v => set('duration', v)} />
          <Field label="Location" value={form.location} onChange={v => set('location', v)} />
          <Field label="Tech Stack" value={form.techStack} onChange={v => set('techStack', v)} />
          <Textarea label="Responsibilities (one per line)" value={form.responsibilities} onChange={v => set('responsibilities', v)} rows={4} />
          <Field label="Link" value={form.link} onChange={v => set('link', v)} />
          <Field label="Image Path" value={form.image} onChange={v => set('image', v)} />
          <Field label="Order" value={String(form.order)} onChange={v => set('order', v)} type="number" />
          <SaveBtn onClick={save} />
          <StatusMsg msg={status} />
        </FormCard>
      )}

      {items.sort((a, b) => a.order - b.order).map(item => (
        <ItemCard key={item._id} onEdit={() => startEdit(item)} onDelete={() => del(item._id)}>
          <strong style={{ color: '#c4b5fd' }}>{item.company}</strong> — {item.role}
          <br /><span style={{ color: '#6b7280', fontSize: 13 }}>{item.duration} · {item.location}</span>
        </ItemCard>
      ))}
      {!form && <StatusMsg msg={status} />}
    </div>
  );
}
