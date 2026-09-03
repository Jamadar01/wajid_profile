import React, { useEffect, useState, useCallback } from 'react';
import { api } from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import { StatusMsg } from './shared';

export default function MessagesInbox() {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [status, setStatus]     = useState('');

  const load = useCallback(() => {
    api.get('/api/messages', token)
      .then(setMessages)
      .catch(e => setStatus(`Error: ${e.message}`));
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const toggleRead = async (m) => {
    try {
      const updated = await api.put(`/api/messages/${m._id}/read`, { read: !m.read }, token);
      setMessages(msgs => msgs.map(x => (x._id === m._id ? updated : x)));
    } catch (e) {
      setStatus(`Error: ${e.message}`);
    }
  };

  const remove = async (m) => {
    if (!window.confirm(`Delete message from ${m.name}?`)) return;
    try {
      await api.delete(`/api/messages/${m._id}`, token);
      setMessages(msgs => msgs.filter(x => x._id !== m._id));
    } catch (e) {
      setStatus(`Error: ${e.message}`);
    }
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <div>
      <h2 style={{ color: 'var(--text)', marginTop: 0 }}>
        📬 Messages
        {unread > 0 && (
          <span style={{
            marginLeft: 12, fontSize: 13, background: 'rgba(124,58,237,0.25)',
            color: 'var(--accent-soft)', borderRadius: 12, padding: '3px 10px', verticalAlign: 'middle',
          }}>{unread} unread</span>
        )}
        <StatusMsg msg={status} />
      </h2>

      {messages.length === 0 && (
        <p style={{ color: 'var(--text-mid)', fontSize: 14 }}>No messages yet.</p>
      )}

      {messages.map(m => (
        <div key={m._id} style={{
          background: m.read ? 'var(--surface-1)' : 'rgba(124,58,237,0.08)',
          border: `1px solid ${m.read ? 'var(--border)' : 'rgba(124,58,237,0.3)'}`,
          borderRadius: 10, padding: '14px 16px', marginBottom: 10,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ color: 'var(--text)', fontSize: 14 }}>
              <strong style={{ color: m.read ? 'var(--text-mid)' : 'var(--text)' }}>{m.name}</strong>
              {' · '}
              <a href={`mailto:${m.email}`} style={{ color: 'var(--purple)' }}>{m.email}</a>
              <span style={{ color: 'var(--text-dim)', marginLeft: 10, fontSize: 12 }}>
                {new Date(m.createdAt).toLocaleString()}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button onClick={() => toggleRead(m)} style={{
                background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)',
                borderRadius: 6, padding: '4px 12px', color: 'var(--purple)', cursor: 'pointer', fontSize: 13,
              }}>{m.read ? 'Mark unread' : 'Mark read'}</button>
              <button onClick={() => remove(m)} style={{
                background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)',
                borderRadius: 6, padding: '4px 12px', color: 'var(--danger)', cursor: 'pointer', fontSize: 13,
              }}>Delete</button>
            </div>
          </div>
          {m.subject && (
            <p style={{ color: 'var(--accent-soft)', fontSize: 13, margin: '8px 0 0', fontWeight: 600 }}>{m.subject}</p>
          )}
          <p style={{ color: 'var(--text-mid)', fontSize: 14, margin: '6px 0 0', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
            {m.body}
          </p>
        </div>
      ))}
    </div>
  );
}
