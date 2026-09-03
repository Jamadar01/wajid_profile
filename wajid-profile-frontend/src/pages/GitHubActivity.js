import React, { useEffect, useState } from 'react';

const GITHUB_USER = 'Jamadar01';

const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  Java: '#b07219', HTML: '#e34c26', CSS: '#563d7c', C: '#555555',
  'C++': '#f34b7d', Dart: '#00B4AB', Go: '#00ADD8', Rust: '#dea584',
};

export default function GitHubActivity() {
  const [repos, setRepos] = useState([]);
  const [user, setUser]   = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`).then(r => (r.ok ? r.json() : Promise.reject())),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100`).then(r => (r.ok ? r.json() : Promise.reject())),
    ])
      .then(([u, rs]) => {
        if (cancelled) return;
        setUser(u);
        const top = rs
          .filter(r => !r.fork)
          .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at) - new Date(a.pushed_at)))
          .slice(0, 6);
        setRepos(top);
      })
      .catch(() => { if (!cancelled) setError(true); });
    return () => { cancelled = true; };
  }, []);

  if (error) return null; // API rate-limited or offline — hide the section gracefully

  return (
    <section id="github" className="space-section">
      <p className="section-label">Open Source</p>
      <h2 className="section-heading">Mission Logs — GitHub</h2>
      <div className="section-divider" />

      {user && (
        <div className="gh-stats-bar">
          <div className="gh-stat"><span className="gh-stat-num">{user.public_repos}</span><span className="gh-stat-label">Repositories</span></div>
          <div className="gh-stat"><span className="gh-stat-num">{user.followers}</span><span className="gh-stat-label">Followers</span></div>
          <div className="gh-stat"><span className="gh-stat-num">{repos.reduce((s, r) => s + r.stargazers_count, 0)}</span><span className="gh-stat-label">Stars (top repos)</span></div>
          <a className="btn-ghost" href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">
            View Profile ↗
          </a>
        </div>
      )}

      <div className="gh-grid">
        {repos.map(r => (
          <a key={r.id} className="gh-card glass-card" href={r.html_url} target="_blank" rel="noreferrer">
            <p className="gh-repo-name">📁 {r.name}</p>
            <p className="gh-repo-desc">{r.description || 'No description yet.'}</p>
            <div className="gh-repo-meta">
              {r.language && (
                <span className="gh-meta-item">
                  <span className="gh-lang-dot" style={{ background: LANG_COLORS[r.language] || '#8b5cf6' }} />
                  {r.language}
                </span>
              )}
              <span className="gh-meta-item">⭐ {r.stargazers_count}</span>
              <span className="gh-meta-item">⑂ {r.forks_count}</span>
              <span className="gh-meta-item gh-updated">
                {new Date(r.pushed_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
