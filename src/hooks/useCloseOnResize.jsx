import { useCallback } from 'react';
import useOnResize from './useOnResize';

export default function useCloseOnResize(setIsActive) {
  const closeOnResize = useCallback(() => setIsActive(false), [setIsActive]);

  useOnResize(closeOnResize);
}
