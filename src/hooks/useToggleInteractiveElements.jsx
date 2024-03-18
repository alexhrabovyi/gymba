import { useCallback, useEffect } from 'react';
import findAllInteractiveElements from '../utils/findAllInteractiveElements';

export default function useToggleInteractiveElements(mainElement, isActive, text) {
  console.log(text);

  const disableInteractiveElements = useCallback(() => {
    if (!mainElement) return;

    let noMainElements;
    let mainElements;

    if (isActive) {
      noMainElements = Array.from(findAllInteractiveElements(document.body))
        .filter((el) => !el.closest('[role="dialog"]'));

      noMainElements.forEach((el) => {
        el.tabIndex = '-1';
        el.ariaHidden = true;
      });
    } else {
      mainElements = Array.from(findAllInteractiveElements(mainElement));

      mainElements.forEach((el) => {
        el.tabIndex = '-1';
        el.ariaHidden = true;
      });
    }

    return () => {
      if (!mainElement) return;

      if (isActive) {
        noMainElements.forEach((el) => {
          el.tabIndex = '';
          el.ariaHidden = false;
        });
      } else {
        mainElements.forEach((el) => {
          el.tabIndex = '0';
          el.ariaHidden = false;
        });
      }
    };
  }, [mainElement, isActive]);

  useEffect(disableInteractiveElements, [disableInteractiveElements]);
}
