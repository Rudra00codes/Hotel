import { useState, useEffect } from 'react';
import { sanityClient } from '../lib/sanity';

export function useSanityContent<T>(query: string, params: Record<string, any> = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await sanityClient.fetch(query, params);
        setData(result);
      } catch (err) {
        console.error('Error fetching Sanity data:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, JSON.stringify(params)]);

  return { data, loading, error };
}
