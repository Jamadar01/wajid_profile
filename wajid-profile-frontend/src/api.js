const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const api = {
  get: (path) =>
    fetch(`${BASE}${path}`).then(r => {
      if (!r.ok) throw new Error(`API error: ${r.status}`);
      return r.json();
    }),
};
