import React, { useState } from 'react';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';

const EMPTY = { name: '', email: '', subject: '', body: '' };

export default function Contact() {
  const { data: profile } = useFetch('/api/profile');
  const [form, setForm]     = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const social = profile?.social || {};
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.post('/api/messages', form);
      setStatus('sent');
      setForm(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="space-section">
      <p className="section-label">Contact</p>
      <h2 className="section-heading">Open a Comm Channel</h2>
      <div className="section-divider" />
      <p className="about-text" style={{ marginBottom: '2rem', maxWidth: 520 }}>
        Have a project, an opportunity, or just want to say hi? Send a transmission —
        it lands straight in my inbox.
      </p>

      <div className="contact-grid">
        <form className="contact-form glass-card" onSubmit={submit}>
          <div className="contact-row">
            <label className="contact-label">
              Name *
              <input
                className="contact-input"
                type="text"
                value={form.name}
                onChange={set('name')}
                required
                maxLength={100}
                placeholder="Your name"
              />
            </label>
            <label className="contact-label">
              Email *
              <input
                className="contact-input"
                type="email"
                value={form.email}
                onChange={set('email')}
                required
                maxLength={200}
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="contact-label">
            Subject
            <input
              className="contact-input"
              type="text"
              value={form.subject}
              onChange={set('subject')}
              maxLength={200}
              placeholder="What's this about?"
            />
          </label>
          <label className="contact-label">
            Message *
            <textarea
              className="contact-input contact-textarea"
              value={form.body}
              onChange={set('body')}
              required
              maxLength={3000}
              rows={5}
              placeholder="Type your message…"
            />
          </label>
          <div className="contact-actions">
            <button className="btn-primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Transmitting…' : 'Send Transmission 🚀'}
            </button>
            {status === 'sent'  && <span className="contact-status ok">Message received — I'll get back to you soon!</span>}
            {status === 'error' && <span className="contact-status err">Transmission failed. Try again or email me directly.</span>}
          </div>
        </form>

        <div className="contact-links">
          {social.email && (
            <a className="contact-link glass-card" href={`mailto:${social.email}`}>
              <span className="contact-link-icon">✉️</span>
              <span>
                <p className="contact-link-title">Email</p>
                <p className="contact-link-sub">{social.email}</p>
              </span>
            </a>
          )}
          {social.linkedin && (
            <a className="contact-link glass-card" href={social.linkedin} target="_blank" rel="noreferrer">
              <span className="contact-link-icon">💼</span>
              <span>
                <p className="contact-link-title">LinkedIn</p>
                <p className="contact-link-sub">Connect with me</p>
              </span>
            </a>
          )}
          {social.github && (
            <a className="contact-link glass-card" href={social.github} target="_blank" rel="noreferrer">
              <span className="contact-link-icon">🐙</span>
              <span>
                <p className="contact-link-title">GitHub</p>
                <p className="contact-link-sub">See what I'm building</p>
              </span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
