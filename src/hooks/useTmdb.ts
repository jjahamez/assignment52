import { API_KEY } from '@/core';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function useTmdb<T>(url: string, params: Record<string, unknown>, deps: unknown[]) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url, {
          params: {
            api_key: API_KEY,
            ...params,
          },
          signal: controller.signal,
        });

        setData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    return () => controller.abort();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return { data };
}