import React, { useEffect, useState } from 'react';
import { api } from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import { SaveBtn, StatusMsg } from './shared';

const inputStyle = {
  width: '100%', background: 'var(--surface-3)', border: '1px solid var(--border-mid)',
  borderRadius: 8, padding: '9px 12px', color: 'var(--text)', fontSize: 14,
  outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace',
};

const cardStyle = {
  background: 'var(--surface-1)', border: '1px solid var(--border)',
  borderRadius: 10, padding: '14px 16px', marginBottom: 12,
};

export default function SkillsEditor() {
  const { token } = useAuth();
  const [groups, setGroups] = useState([]);
  const [cons, setCons]     = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.get('/api/skills').then(d => setGroups(
      (d.groups || []).map(g => ({ label: g.label, skills: (g.skills || []).join(', ') }))
    ));
    /* the tree endpoint carries projectCount per star, so the match quality is
       visible right where the aliases are edited */
    api.get('/api/skills/tree').then(d => setCons(
      (d.constellations || []).map(c => ({
        ...c,
        stars: (c.stars || []).map(s => ({ ...s, aliasText: (s.aliases || []).join(', ') })),
      }))
    )).catch(() => setCons([]));
  }, []);

  const updateGroup = (i, key, val) =>
    setGroups(prev => prev.map((g, idx) => idx === i ? { ...g, [key]: val } : g));

  const addGroup    = () => setGroups(prev => [...prev, { label: '', skills: '' }]);
  const removeGroup = (i) => setGroups(prev => prev.filter((_, idx) => idx !== i));

  const updateAlias = (ci, si, val) =>
    setCons(prev => prev.map((c, i) => i !== ci ? c : {
      ...c,
      stars: c.stars.map((s, j) => j === si ? { ...s, aliasText: val } : s),
    }));

  const save = async () => {
    try {
      await api.put('/api/skills', {
        groups: groups.map(g => ({
          label:  g.label.trim(),
          skills: g.skills.split(',').map(s => s.trim()).filter(Boolean),
        })),
        /* strip the derived fields the tree endpoint added — only the stored
           shape goes back, or projects would be written into the skills doc */
        constellations: cons.map(c => ({
          name:  c.name,
          color: c.color,
          lines: c.lines,
          stars: c.stars.map(s => ({
            id: s.id, label: s.label, x: s.x, y: s.y, r: s.r,
            aliases: s.aliasText.split(',').map(a => a.trim()).filter(Boolean),
          })),
        })),
      }, token);
      setStatus('Saved!');
    } catch (e) { setStatus('Error: ' + e.message); }
    setTimeout(() => setStatus(''), 3000);
  };

  const unmatched = cons.flatMap(c => c.stars).filter(s => !s.projectCount).length;

  return (
    <div>
      <h2 style={{ color: 'var(--purple)', marginBottom: 8 }}>Skills</h2>
      <p style={{ color: 'var(--text-mid)', fontSize: 13, marginBottom: 24 }}>
        Groups feed the skill chips. Constellation stars feed the interactive map, where
        clicking a star lists the projects built with it.
      </p>

      <h3 style={{ color: 'var(--purple)', fontSize: 13, letterSpacing: 1, marginBottom: 12 }}>
        SKILL GROUPS
      </h3>

      {groups.map((g, i) => (
        <div key={i} style={cardStyle}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <input style={{ ...inputStyle, flex: '0 0 200px' }}
              placeholder="Group label" value={g.label}
              onChange={e => updateGroup(i, 'label', e.target.value)} />
            <input style={inputStyle}
              placeholder="Skills (comma-separated)" value={g.skills}
              onChange={e => updateGroup(i, 'skills', e.target.value)} />
            <button onClick={() => removeGroup(i)} style={{
              background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)',
              borderRadius: 6, padding: '6px 12px', color: 'var(--danger)', cursor: 'pointer',
              fontSize: 13, flexShrink: 0,
            }}>✕</button>
          </div>
        </div>
      ))}

      <button onClick={addGroup} style={{
        background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)',
        borderRadius: 8, padding: '8px 20px', color: 'var(--ok)', cursor: 'pointer',
        fontSize: 14, marginBottom: 28, display: 'block',
      }}>+ Add Group</button>

      <h3 style={{ color: 'var(--purple)', fontSize: 13, letterSpacing: 1, marginBottom: 8 }}>
        STAR → PROJECT MATCHING
      </h3>
      <p style={{ color: 'var(--text-mid)', fontSize: 13, marginBottom: 8 }}>
        The number is how many projects each star currently matches. Matching already handles
        <code> React.js / React / React 19</code> and singular vs plural, so add an alias only
        when a project tags the skill under a different name — <code>GCP</code> needing{' '}
        <code>Google Cloud Platform</code>. Star positions and lines stay in the seed script.
      </p>
      {!!unmatched && (
        <p style={{ color: 'var(--warn)', fontSize: 13, marginBottom: 16 }}>
          {unmatched} {unmatched === 1 ? 'star matches' : 'stars match'} no project. That is fine
          for tools you use but have not tagged — otherwise add an alias.
        </p>
      )}

      {cons.map((c, ci) => (
        <div key={c.name} style={cardStyle}>
          <p style={{
            color: c.color, fontSize: 12, letterSpacing: 1.5,
            textTransform: 'uppercase', marginBottom: 12, fontWeight: 700,
          }}>{c.name}</p>

          {c.stars.map((s, si) => (
            <div key={s.id} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
              <span style={{
                flex: '0 0 130px', color: 'var(--text)', fontSize: 13,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{s.label}</span>

              <span style={{
                flex: '0 0 34px', textAlign: 'center', fontSize: 12,
                color: s.projectCount ? 'var(--ok)' : 'var(--text-dim)',
              }}>{s.projectCount ?? 0}</span>

              <input
                style={inputStyle}
                placeholder="aliases (comma-separated) — optional"
                value={s.aliasText}
                onChange={e => updateAlias(ci, si, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}

      <SaveBtn onClick={save} />
      <StatusMsg msg={status} />
    </div>
  );
}
