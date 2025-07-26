import { useState, useEffect, useCallback } from "react";

// Simple cache implementation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache = new Map<string, any>();

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  cacheKey?: string
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: cacheKey && cache.has(cacheKey) ? cache.get(cacheKey) : null,
    loading: !cacheKey || !cache.has(cacheKey),
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (cacheKey && cache.has(cacheKey)) {
      return;
    }

    try {
      const data = await asyncFunction();
      if (cacheKey) {
        cache.set(cacheKey, data);
      }
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, [asyncFunction, cacheKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
}
