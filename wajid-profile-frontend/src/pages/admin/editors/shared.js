import React from 'react';

const inputStyle = {
  width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8, padding: '9px 12px', color: '#e5e7eb', fontSize: 14, marginBottom: 16,
  outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace',
};
const labelStyle = { color: '#9ca3af', fontSize: 12, display: 'block', marginBottom: 6, letterSpacing: 1 };

export function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label style={labelStyle}>{label.toUpperCase()}</label>
      <input style={inputStyle} type={type} value={value}
        onChange={e => onChange(e.target.value)} />
    </div>
  );
}

export function Textarea({ label, value, onChange, rows = 3 }) {
  return (
    <div>
      <label style={labelStyle}>{label.toUpperCase()}</label>
      <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={rows}
        value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

export function SaveBtn({ onClick, label = 'Save Changes' }) {
  return (
    <button onClick={onClick} style={{
      background: '#7c3aed', border: 'none', borderRadius: 8,
      padding: '10px 24px', color: '#fff', fontSize: 14,
      fontWeight: 600, cursor: 'pointer', marginTop: 8,
    }}>{label}</button>
  );
}

export function StatusMsg({ msg }) {
  if (!msg) return null;
  const ok = !msg.startsWith('Error');
  return (
    <span style={{ marginLeft: 16, fontSize: 13, color: ok ? '#34d399' : '#f87171' }}>
      {msg}
    </span>
  );
}

export function ItemCard({ children, onEdit, onDelete }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 10, padding: '14px 16px', marginBottom: 10,
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12,
    }}>
      <div style={{ flex: 1, color: '#d1d5db', fontSize: 14, lineHeight: 1.6 }}>{children}</div>
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button onClick={onEdit} style={{
          background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)',
          borderRadius: 6, padding: '4px 12px', color: '#a78bfa', cursor: 'pointer', fontSize: 13,
        }}>Edit</button>
        <button onClick={onDelete} style={{
          background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)',
          borderRadius: 6, padding: '4px 12px', color: '#f87171', cursor: 'pointer', fontSize: 13,
        }}>Delete</button>
      </div>
    </div>
  );
}

export function FormCard({ children, onCancel }) {
  return (
    <div style={{
      background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)',
      borderRadius: 12, padding: '20px', marginBottom: 20,
    }}>
      {children}
      <button onClick={onCancel} style={{
        background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 8, padding: '8px 20px', color: '#9ca3af', cursor: 'pointer',
        fontSize: 13, marginLeft: 12,
      }}>Cancel</button>
    </div>
  );
}

export function AddBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)',
      borderRadius: 8, padding: '8px 20px', color: '#34d399', cursor: 'pointer',
      fontSize: 14, marginBottom: 20,
    }}>+ Add New</button>
  );
}
