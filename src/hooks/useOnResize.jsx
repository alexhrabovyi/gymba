import { useEffect } from 'react';

export default function useOnResize(callback) {
  useEffect(() => {
    window.addEventListener('resize', callback);

    return () => window.removeEventListener('resize', callback);
  }, [callback]);
}
