import { useEffect } from 'react';
import { FetcherWithComponents } from 'react-router-dom';

export default function useFetcherLoad(fetcher: FetcherWithComponents<any>, action: string) {
  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load(action);
    }
  }, [fetcher, action]);
}
