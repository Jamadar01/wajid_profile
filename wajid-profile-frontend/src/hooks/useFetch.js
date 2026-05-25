import { useState, useEffect } from 'react';
import { api } from '../api';

export function useFetch(path, defaultValue = null) {
  const [data, setData]       = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api.get(path)
      .then(d  => { if (!cancelled) setData(d); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(()=> { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [path]);

  return { data, loading, error };
}
