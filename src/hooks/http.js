import { useState, useEffect } from 'react';

export const useHttp = ({ url, dependencies = [] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch.');

        const data = await response.json();
        setFetchedData(data);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    })()
  }, dependencies);

  return {
    isLoading,
    fetchedData
  };
};
