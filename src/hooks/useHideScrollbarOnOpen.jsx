import { useCallback, useEffect } from 'react';
import getScrollWidth from '../utils/getScrollWidth.jsx';

export default function useHideScrollbarOnOpen(isOpen) {
  const hideScrollbarOnOpen = useCallback(() => {
    if (isOpen) {
      const scrollWidth = getScrollWidth();
      document.body.style.paddingRight = `${scrollWidth}px`;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }

    return () => {
      if (isOpen) {
        document.body.style.paddingRight = '';
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
      }
    };
  }, [isOpen]);

  useEffect(hideScrollbarOnOpen, [hideScrollbarOnOpen]);
}
