const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const req = (method, path, body, token) =>
  fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  }).then(r => {
    if (!r.ok) throw new Error(`API error: ${r.status}`);
    return r.json();
  });

export const api = {
  get:    (path)                => req('GET',    path),
  post:   (path, body, token)   => req('POST',   path, body, token),
  put:    (path, body, token)   => req('PUT',    path, body, token),
  delete: (path, token)         => req('DELETE', path, undefined, token),
};
