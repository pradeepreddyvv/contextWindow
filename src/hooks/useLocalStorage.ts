import { useState, useCallback } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (val: T) => void] {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setValue = useCallback(
    (val: T) => {
      setStored(val);
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch {
        // localStorage unavailable — continue in-memory
      }
    },
    [key]
  );

  return [stored, setValue];
}
