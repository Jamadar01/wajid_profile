import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const s = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#060612', fontFamily: 'monospace',
  },
  card: {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(167,139,250,0.25)',
    borderRadius: 16, padding: '2.5rem', width: 360, backdropFilter: 'blur(12px)',
  },
  title: { color: '#a78bfa', fontSize: 22, fontWeight: 700, marginBottom: 8, textAlign: 'center' },
  sub:   { color: '#6b7280', fontSize: 13, textAlign: 'center', marginBottom: 28 },
  label: { color: '#9ca3af', fontSize: 12, display: 'block', marginBottom: 6, letterSpacing: 1 },
  input: {
    width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8, padding: '10px 12px', color: '#e5e7eb', fontSize: 14, marginBottom: 18,
    outline: 'none', boxSizing: 'border-box',
  },
  btn: {
    width: '100%', background: '#7c3aed', border: 'none', borderRadius: 8,
    padding: '11px', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer',
    marginTop: 4,
  },
  err: { color: '#f87171', fontSize: 13, marginBottom: 12, textAlign: 'center' },
};

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <form style={s.card} onSubmit={handleSubmit}>
        <p style={s.title}>⚙ Admin Access</p>
        <p style={s.sub}>Portfolio control panel</p>
        {error && <p style={s.err}>{error}</p>}
        <label style={s.label}>EMAIL</label>
        <input style={s.input} type="email" value={email}
          onChange={e => setEmail(e.target.value)} required autoFocus />
        <label style={s.label}>PASSWORD</label>
        <input style={s.input} type="password" value={password}
          onChange={e => setPassword(e.target.value)} required />
        <button style={s.btn} type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
