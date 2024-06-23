import { useCallback } from 'react';
import useOnResize from './useOnResize';

export default function useCloseOnResize(
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const closeOnResize = useCallback(() => setIsActive(false), [setIsActive]);

  useOnResize(closeOnResize);
}
