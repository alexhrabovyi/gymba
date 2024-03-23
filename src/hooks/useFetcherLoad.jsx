import { useEffect } from 'react';

export default function useFetcherLoad(fetcher, action) {
  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load(action);
    }
  }, [fetcher, action]);
}
