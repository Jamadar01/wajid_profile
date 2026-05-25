import React, { useEffect, useState } from 'react';

const targets = { projects: 15, commits: 1200, lines: 50000 };
const steps   = { projects: 1,  commits: 25,   lines: 600   };

export default function PerformanceMetrics() {
  const [v, setV] = useState({ projects: 0, commits: 0, lines: 0 });

  useEffect(() => {
    let cur = { projects: 0, commits: 0, lines: 0 };
    const id = setInterval(() => {
      let done = true;
      const next = {};
      for (const k of Object.keys(targets)) {
        next[k] = Math.min(cur[k] + steps[k], targets[k]);
        if (next[k] < targets[k]) done = false;
        cur[k] = next[k];
      }
      setV({ ...next });
      if (done) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, []);

  const cards = [
    { value: `${v.projects}+`,                   label: 'Projects Completed' },
    { value: `${v.commits}+`,                     label: 'GitHub Commits'     },
    { value: `${v.lines.toLocaleString()}+`,       label: 'Lines of Code'      },
  ];

  return (
    <div className="metrics-grid" style={{ marginTop: '2rem' }}>
      {cards.map(({ value, label }) => (
        <div key={label} className="metric-card">
          <div className="metric-value">{value}</div>
          <div className="metric-label">{label}</div>
        </div>
      ))}
    </div>
  );
}
