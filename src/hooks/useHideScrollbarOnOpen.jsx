import { useCallback, useEffect } from 'react';
import getScrollWidth from '../utils/getScrollWidth.jsx';

export default function useHideScrollbarOnOpen(isOpen) {
  const hideScrollbarOnOpen = useCallback(() => {
    if (isOpen) {
      const scrollWidth = getScrollWidth();
      document.body.style.paddingRight = `${scrollWidth}px`;
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflowY = '';
    };
  }, [isOpen]);

  useEffect(hideScrollbarOnOpen, [hideScrollbarOnOpen]);
}
