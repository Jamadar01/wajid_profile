import React, { useEffect, useState } from 'react';
import { api } from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import { SaveBtn, StatusMsg } from './shared';

const inputStyle = {
  width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8, padding: '9px 12px', color: '#e5e7eb', fontSize: 14,
  outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace',
};

export default function SkillsEditor() {
  const { token } = useAuth();
  const [groups, setGroups]   = useState([]);
  const [status, setStatus]   = useState('');

  useEffect(() => {
    api.get('/api/skills').then(d => setGroups(
      (d.groups || []).map(g => ({ label: g.label, skills: g.skills.join(', ') }))
    ));
  }, []);

  const updateGroup = (i, key, val) =>
    setGroups(prev => prev.map((g, idx) => idx === i ? { ...g, [key]: val } : g));

  const addGroup = () => setGroups(prev => [...prev, { label: '', skills: '' }]);

  const removeGroup = (i) => setGroups(prev => prev.filter((_, idx) => idx !== i));

  const save = async () => {
    try {
      await api.put('/api/skills', {
        groups: groups.map(g => ({
          label:  g.label.trim(),
          skills: g.skills.split(',').map(s => s.trim()).filter(Boolean),
        })),
      }, token);
      setStatus('Saved!');
    } catch (e) { setStatus('Error: ' + e.message); }
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <div>
      <h2 style={{ color: '#a78bfa', marginBottom: 8 }}>Skills</h2>
      <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 24 }}>
        Edit skill groups. Constellation positions are managed via the seed script.
      </p>

      {groups.map((g, i) => (
        <div key={i} style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10, padding: '14px 16px', marginBottom: 12,
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
            <input style={{ ...inputStyle, marginBottom: 0, flex: '0 0 200px' }}
              placeholder="Group label" value={g.label}
              onChange={e => updateGroup(i, 'label', e.target.value)} />
            <input style={{ ...inputStyle, marginBottom: 0 }}
              placeholder="Skills (comma-separated)" value={g.skills}
              onChange={e => updateGroup(i, 'skills', e.target.value)} />
            <button onClick={() => removeGroup(i)} style={{
              background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)',
              borderRadius: 6, padding: '6px 12px', color: '#f87171', cursor: 'pointer',
              fontSize: 13, flexShrink: 0,
            }}>✕</button>
          </div>
        </div>
      ))}

      <button onClick={addGroup} style={{
        background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)',
        borderRadius: 8, padding: '8px 20px', color: '#34d399', cursor: 'pointer',
        fontSize: 14, marginBottom: 20, display: 'block',
      }}>+ Add Group</button>

      <SaveBtn onClick={save} />
      <StatusMsg msg={status} />
    </div>
  );
}
