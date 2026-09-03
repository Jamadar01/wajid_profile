import React, { useEffect, useState } from 'react';
import { api } from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import { Field, Select, Textarea, SaveBtn, StatusMsg, ItemCard, FormCard, AddBtn } from './shared';

const KINDS = [
  { value: 'certification', label: 'Certification — full exam-based cert' },
  { value: 'achievement',  label: 'Skill badge / achievement' },
];

const blank = {
  name: '', issuer: '', kind: 'certification', issued: '', expires: '', credentialId: '', verifyUrl: '',
  badgeImage: '', emoji: '📜', color: '#38BDF8', glow: '', skills: '', desc: '', order: 0,
};

export default function CertificationsEditor() {
  const { token } = useAuth();
  const [items, setItems]   = useState([]);
  const [form, setForm]     = useState(null);
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState('');

  const load = () => api.get('/api/certifications').then(setItems);
  useEffect(() => { load(); }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const startEdit = (item) => {
    setEditId(item._id);
    setForm({ ...blank, ...item, skills: (item.skills || []).join(', ') });
  };

  const startAdd = () => { setEditId(null); setForm({ ...blank, order: items.length }); };

  const cancel = () => { setForm(null); setEditId(null); };

  const save = async () => {
    const body = {
      ...form,
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
      order:  Number(form.order),
    };
    try {
      if (editId) await api.put(`/api/certifications/${editId}`, body, token);
      else        await api.post('/api/certifications', body, token);
      setStatus('Saved!'); setForm(null); setEditId(null); await load();
    } catch (e) { setStatus('Error: ' + e.message); }
    setTimeout(() => setStatus(''), 3000);
  };

  const del = async (id) => {
    if (!window.confirm('Delete this certification?')) return;
    try { await api.delete(`/api/certifications/${id}`, token); await load(); }
    catch (e) { setStatus('Error: ' + e.message); }
  };

  const missingVerify = items.filter(i => !i.verifyUrl).length;

  return (
    <div>
      <h2 style={{ color: 'var(--purple)', marginBottom: 8 }}>Certifications</h2>
      <p style={{ color: 'var(--text-mid)', fontSize: 13, marginBottom: 20 }}>
        Shown on the homepage under <strong style={{ color: 'var(--text)' }}>Certifications</strong>.
        The whole section hides itself when there are none. The Verify button and the credential
        ID each appear only when you fill them in.
      </p>

      {!!missingVerify && (
        <div style={{
          background: 'rgba(56,189,248,0.07)', border: '1px solid rgba(56,189,248,0.25)',
          borderRadius: 8, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: 'var(--info)',
        }}>
          {missingVerify} {missingVerify === 1 ? 'certification has' : 'certifications have'} no
          verify URL yet — hiring managers can&apos;t confirm it without one. For Google Cloud, grab
          the public link from your certificate in the Credential Wallet.
        </div>
      )}

      <AddBtn onClick={startAdd} />

      {form && (
        <FormCard onCancel={cancel}>
          <h3 style={{ color: 'var(--accent-soft)', marginBottom: 16, fontSize: 15 }}>
            {editId ? 'Edit Certification' : 'New Certification'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Field label="Name" value={form.name} onChange={v => set('name', v)} />
            <Field label="Issuer" value={form.issuer} onChange={v => set('issuer', v)} />
            <Select label="Type" value={form.kind} onChange={v => set('kind', v)} options={KINDS} />
            <Field label="Issued (e.g. Mar 2025)" value={form.issued} onChange={v => set('issued', v)} />
            <Field label="Expires (blank = no expiry)" value={form.expires} onChange={v => set('expires', v)} />
            <Field label="Credential ID" value={form.credentialId} onChange={v => set('credentialId', v)} />
            <Field label="Verify URL" value={form.verifyUrl} onChange={v => set('verifyUrl', v)} />
            <Field label="Badge Image (path or URL)" value={form.badgeImage} onChange={v => set('badgeImage', v)} />
            <Field label="Emoji (used if no badge image)" value={form.emoji} onChange={v => set('emoji', v)} />
            <Field label="Color (hex)" value={form.color} onChange={v => set('color', v)} />
            <Field label="Glow (rgba)" value={form.glow} onChange={v => set('glow', v)} />
          </div>

          <p style={{ color: 'var(--text-dim)', fontSize: 12, marginTop: -8, marginBottom: 16 }}>
            <strong style={{ color: 'var(--info)' }}>Credly:</strong> paste your badge page
            (<code>credly.com/badges/&lt;id&gt;</code>) as the Verify URL — the button then reads
            &ldquo;View on Credly&rdquo;. For the artwork, open that page, right-click the badge
            image, copy its address, and paste it as Badge Image. The badge must be set to
            public on Credly or the link will 404 for anyone but you.
          </p>

          <Field label="Skills (comma-separated)" value={form.skills} onChange={v => set('skills', v)} />
          <Textarea label="Description" value={form.desc} onChange={v => set('desc', v)} rows={3} />
          <Field label="Order" value={String(form.order)} onChange={v => set('order', v)} type="number" />

          <SaveBtn onClick={save} />
          <StatusMsg msg={status} />
        </FormCard>
      )}

      {items.slice().sort((a, b) => a.order - b.order).map(item => (
        <ItemCard key={item._id} onEdit={() => startEdit(item)} onDelete={() => del(item._id)}>
          <span style={{ fontSize: 18, marginRight: 8 }}>{item.emoji}</span>
          <strong style={{ color: 'var(--accent-soft)' }}>{item.name}</strong>
          {!item.verifyUrl && (
            <span style={{
              marginLeft: 8, fontSize: 10, letterSpacing: 1.5, color: 'var(--info)',
              border: '1px solid rgba(56,189,248,0.3)', borderRadius: 20, padding: '2px 8px',
            }}>NO VERIFY LINK</span>
          )}
          <br />
          <span style={{ color: 'var(--text-mid)', fontSize: 13 }}>
            {item.issuer}{item.issued ? ` · ${item.issued}` : ''}
            {item.expires ? ` → ${item.expires}` : ''}
          </span>
          <br />
          <span style={{ color: 'var(--text-dim)', fontSize: 12 }}>
            {(item.skills || []).length} skills
            {item.credentialId ? ` · ID ${item.credentialId}` : ' · no credential ID'}
          </span>
        </ItemCard>
      ))}
      {!form && <StatusMsg msg={status} />}
    </div>
  );
}
