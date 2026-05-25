import React from 'react';

const recs = [
  { quote: 'Wajid is a highly resourceful developer who always finds elegant solutions.', name: 'John Doe',  role: 'Tech Lead @ CompanyX'          },
  { quote: 'His problem-solving and teamwork skills are absolutely top-notch.',           name: 'Jane Smith', role: 'Product Manager @ StartupY'     },
  { quote: 'Always delivers high-quality work on time. A genuinely great team player!',  name: 'Alex Lee',   role: 'Software Engineer @ DevHouse'   },
];

export default function Recommendations() {
  return (
    <div className="rec-grid">
      {recs.map((r, i) => (
        <div key={i} className="glass-card">
          <p className="rec-quote">{r.quote}</p>
          <p className="rec-name">{r.name}</p>
          <p className="rec-role">{r.role}</p>
        </div>
      ))}
    </div>
  );
}
